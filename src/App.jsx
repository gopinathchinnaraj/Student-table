import React, { useState } from 'react';
import { Plus, Download, GraduationCap } from 'lucide-react';
import * as XLSX from 'xlsx';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import ConfirmationModal from './components/ConfirmationModal';

function App() {
  const [students, setStudents] = useState([
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  // Simulated Loading Wrapper
  const withLoading = async (action) => {
    setIsLoading(true);
    // Simulate network delay to make the UI feel real
    await new Promise(resolve => setTimeout(resolve, 600));
    action();
    setIsLoading(false);
  };

  const handleAddSubmit = (data) => {
    withLoading(() => {
      const newStudent = { ...data, id: Date.now() };
      setStudents([...students, newStudent]);
      setIsFormOpen(false);
    });
  };

  const handleEditSubmit = (data) => {
    withLoading(() => {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...data, id: editingStudent.id } : s));
      setEditingStudent(null);
    });
  };

  const handleDeleteConfirm = () => {
    if (deletingStudent) {
      withLoading(() => {
        setStudents(students.filter(s => s.id !== deletingStudent.id));
        setDeletingStudent(null);
      });
    }
  };

  const handleExport = () => {
    // Generate simple rows without IDs for clean export
    const exportData = students.map(({ name, email, age }) => ({
      Name: name,
      Email: email,
      Age: age
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Download the Excel file
    XLSX.writeFile(workbook, "Students_Data.xlsx");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-md)' }}>
            <GraduationCap size={28} />
          </div>
          <h1 className="app-title">Students Registry</h1>
        </div>

        <div className="header-actions">
          <button
            className="btn btn-secondary"
            onClick={handleExport}
            disabled={students.length === 0 || isLoading}
          >
            <Download size={18} /> Export Excel
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setIsFormOpen(true)}
            disabled={isLoading}
          >
            <Plus size={18} /> Add Student
          </button>
        </div>
      </header>

      <main>
        {isLoading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <div>Processing request...</div>
          </div>
        ) : (
          <StudentTable
            students={students}
            onEdit={(student) => setEditingStudent(student)}
            onDelete={(student) => setDeletingStudent(student)}
          />
        )}
      </main>

      {/* Modals */}
      <StudentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddSubmit}
        initialData={null}
      />

      <StudentForm
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        onSubmit={handleEditSubmit}
        initialData={editingStudent}
      />

      <ConfirmationModal
        isOpen={!!deletingStudent}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleDeleteConfirm}
        studentName={deletingStudent?.name}
      />
    </div>
  );
}

export default App;
