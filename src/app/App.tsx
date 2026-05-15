import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CompareJob } from './components/CompareJob';
import { DiffResult } from './components/DiffResult';
import { SqlReviewPanel } from './components/SqlReviewPanel';
import { SyncHistory } from './components/SyncHistory';

type Page = 'patches' | 'audit' | 'compare' | 'review' | 'history' | 'conflicts' | 'rules';

interface SqlReviewState {
  isOpen: boolean;
  rowId: string;
  column: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('compare');
  const [sqlReview, setSqlReview] = useState<SqlReviewState>({
    isOpen: false,
    rowId: '',
    column: ''
  });

  const handleOpenSqlReview = (row: any, column: string) => {
    setSqlReview({
      isOpen: true,
      rowId: row.pk,
      column
    });
  };

  const handleCloseSqlReview = () => {
    setSqlReview({
      isOpen: false,
      rowId: '',
      column: ''
    });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'patches':
        return <PlaceholderPage title="Patches" />;
      case 'audit':
        return <PlaceholderPage title="Audit Review" />;
      case 'compare':
        return <CompareJob onStartReview={() => setCurrentPage('review')} />;
      case 'review':
        return <DiffResult onOpenSqlReview={handleOpenSqlReview} />;
      case 'history':
        return <SyncHistory />;
      case 'conflicts':
        return <PlaceholderPage title="Conflict Review" />;
      case 'rules':
        return <PlaceholderPage title="Ignore Rules" />;
      default:
        return <PlaceholderPage title="Unknown Page" />;
    }
  };

  return (
    <div className="h-screen flex bg-background text-foreground">
      <Sidebar currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as Page)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
      {sqlReview.isOpen && (
        <SqlReviewPanel
          onClose={handleCloseSqlReview}
          rowId={sqlReview.rowId}
          column={sqlReview.column}
        />
      )}
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-2">{title}</h1>
        <p className="text-muted-foreground">This feature is under development</p>
      </div>
    </div>
  );
}
