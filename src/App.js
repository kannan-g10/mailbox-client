import { useEffect, useState } from 'react';
import { auth } from './config/firebase-config';
import NonUserRoutes from './routes/NonUserRoutes';
import UserRoutes from './routes/UserRoutes';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return <p className="text-center mt-20">Loding..</p>;
  }

  return <>{currentUser ? <UserRoutes /> : <NonUserRoutes />}</>;
};

export default App;
