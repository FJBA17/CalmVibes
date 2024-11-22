import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AdminPage.css';

interface Usuario {
  id: number;
  usuario: string;
  email: string;
  rut: string;
  region_nombre: string;
  comuna: string;
}

const AdminPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Verificar si es administrador
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email !== 'pancho@calmvibes.cl') {
      alert('Acceso denegado');
      history.push('/login');
    } else {
      obtenerUsuarios();
    }
  }, [history]);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3002/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    try {
      const response = await fetch(`http://localhost:3002/usuario/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setUsuarios(usuarios.filter((user) => user.id !== id)); // Elimina el usuario de la lista local
        alert('Usuario eliminado correctamente.');
      } else {
        alert('No se pudo eliminar el usuario.');
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario.');
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('user'); // Elimina el usuario almacenado
    history.push('/login'); // Redirige al login
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <button className="logout-button" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rut</th>
            <th>Región</th>
            <th>Comuna</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.usuario}</td>
              <td>{user.email}</td>
              <td>{user.rut}</td>
              <td>{user.region_nombre}</td>
              <td>{user.comuna}</td>
              <td>
                <button className="delete-button" onClick={() => eliminarUsuario(user.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
