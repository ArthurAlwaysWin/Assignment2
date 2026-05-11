import Navbar from './Navbar';
import ErrorBoundary from './ErrorBoundary';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
    </div>
  );
}
