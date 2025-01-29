import { useState } from 'react';
import './App.css';
import jsPDF from 'jspdf';

function App() {
  const [panels, setPanels] = useState([
    {
      id: 1,
      title: '',
      image: '',
      text: '',
    },
  ]);

  const handleAddPanel = () => {
    setPanels([...panels, { id: panels.length + 1, title: '', image: '', text: '' }]);
  };

  const handleImageChange = (id, event) => {
    const newPanels = panels.map((panel) =>
      panel.id === id ? { ...panel, image: event.target.value } : panel
    );
    setPanels(newPanels);
  };

  const handleTextChange = (id, event) => {
    const newPanels = panels.map((panel) =>
      panel.id === id ? { ...panel, text: event.target.value } : panel
    );
    setPanels(newPanels);
  };

  const handleTitleChange = (id, event) => {
    const newPanels = panels.map((panel) =>
      panel.id === id ? { ...panel, title: event.target.value } : panel
    );
    setPanels(newPanels);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    panels.forEach((panel) => {
      if (panel.title) {
        doc.setFontSize(16);
        doc.text(panel.title, 20, y);
        y += 10;
      }

      if (panel.image) {
        doc.addImage(panel.image, 'JPEG', 10, y, 180, 180);
        y += 200;
      }

      doc.setFontSize(12);
      doc.text(panel.text, 20, y);
      y += 20;
    });

    doc.save('my_comic.pdf');
  };

  return (
    <div className="container">
      <h1>Interactive Comic Creator</h1>
      <div className="panel-container">
        {panels.map((panel) => (
          <div key={panel.id} className="panel">
            <input
              type="text"
              placeholder="Panel Title"
              value={panel.title}
              onChange={(e) => handleTitleChange(panel.id, e)}
              className="panel-title"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={panel.image}
              onChange={(e) => handleImageChange(panel.id, e)}
              className="image-input"
            />
            {panel.image && <img src={panel.image} alt={`Panel ${panel.id}`} />}
            <textarea
              placeholder="Dialogue"
              value={panel.text}
              onChange={(e) => handleTextChange(panel.id, e)}
              className="text-input"
            />
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleAddPanel} className="add-btn">
          Add Panel
        </button>
        <button onClick={handleExportPDF} className="export-btn">
          Export as PDF
        </button>
      </div>
    </div>
  );
}

export default App;
