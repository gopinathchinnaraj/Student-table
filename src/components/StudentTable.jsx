import React from 'react';
import { Edit2, Trash2, Users } from 'lucide-react';

export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">
          <Users size={48} className="empty-state-icon" />
          <div className="empty-state-title">No Students Found</div>
          <div>Get started by adding a new student to the system.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={{ fontWeight: 500 }}>{student.name}</td>
              <td style={{ color: 'var(--text-muted)' }}>{student.email}</td>
              <td>{student.age}</td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button 
                    className="btn-icon" 
                    onClick={() => onEdit(student)}
                    title="Edit Student"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    className="btn-icon" 
                    style={{ color: 'var(--danger)' }} 
                    onClick={() => onDelete(student)}
                    title="Delete Student"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
