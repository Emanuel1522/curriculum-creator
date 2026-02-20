import React, { useState } from 'react';
import { useCV } from './hooks/useCV';
import Onboarding from './components/Onboarding';
import EditorLayout from './components/Editor/EditorLayout';

function App() {
  const { cvData, updateField, resetCV, updatePersonal, updateArrayItem, addArrayItem, removeArrayItem, moveSection, toggleSection } = useCV();
  const [view, setView] = useState(() => {
    // If there's already data in localStorage (checked by useCV), go straight to editor
    const saved = localStorage.getItem('cvbuilder_data');
    return saved ? 'editor' : 'onboarding';
  });

  const handleSelectTemplate = (template) => {
    updateField('template', template);
    setView('editor');
  };

  const handleNewCV = () => {
    resetCV();
    setView('onboarding');
  };

  return (
    <div className="min-h-screen font-nunito">
      {view === 'onboarding' ? (
        <Onboarding onSelectTemplate={handleSelectTemplate} />
      ) : (
        <EditorLayout
          cvData={cvData}
          updateField={updateField}
          updatePersonal={updatePersonal}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          moveSection={moveSection}
          toggleSection={toggleSection}
          onNewCV={handleNewCV}
        />
      )}
    </div>
  );
}

export default App;
