import ErrorBoundary from '@components/errorBoundary/ErrorBoundary';
import Home from '@pages/Home/Home';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
};

export default App;
