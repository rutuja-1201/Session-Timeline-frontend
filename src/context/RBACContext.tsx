import React, { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

interface RBACContextType {
  users: User[];
  roles: Role[];
  addUser: (user: User) => void;
  updateUser: (id: number, updatedUser: Partial<User>) => void;
  deleteUser: (id: number) => void;
  addRole: (role: Role) => void;
  updateRole: (id: number, updatedRole: Partial<Role>) => void;
  deleteRole: (id: number) => void;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
  ]);
  

  const addUser = (user: User) => setUsers([...users, user]);
  const updateUser = (id: number, updatedUser: Partial<User>) => {
    setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
  };
  const deleteUser = (id: number) => setUsers(users.filter(user => user.id !== id));

  const addRole = (role: Role) => setRoles([...roles, role]);
  const updateRole = (id: number, updatedRole: Partial<Role>) => {
    setRoles(roles.map(role => (role.id === id ? { ...role, ...updatedRole } : role)));
  };
  const deleteRole = (id: number) => setRoles(roles.filter(role => role.id !== id));

  return (
    <RBACContext.Provider value={{ users, roles, addUser, updateUser, deleteUser, addRole, updateRole, deleteRole }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) throw new Error('useRBAC must be used within a RBACProvider');
  return context;
};
