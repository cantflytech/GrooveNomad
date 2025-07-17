import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserByEmail, createUser } from '../services/airtableService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté dans le localStorage
    const savedUser = localStorage.getItem('grooveNomadUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulation de login - en réalité vous utiliseriez un service d'auth
      const user = await fetchUserByEmail(email);
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('grooveNomadUser', JSON.stringify(user));
        return { success: true };
      } else {
        return { success: false, error: 'Utilisateur non trouvé' };
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const signup = async (userData) => {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await fetchUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'Cet email est déjà utilisé' };
      }

      // Créer le nouvel utilisateur
      const newUser = await createUser({
        userId: `user_${Date.now()}`, // Génération d'un ID simple
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber || '',
        region: userData.region || '',
        country: userData.country || 'France'
      });

      setCurrentUser(newUser);
      localStorage.setItem('grooveNomadUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('grooveNomadUser');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
