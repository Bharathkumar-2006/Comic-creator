import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../App.css';

function Home() {
  const navigate = useNavigate();
  const [panels, setPanels] = useState([
    {
      id: 1,
      title: '',
      image: null,
      text: '',
    },
  ]);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      navigate('/signup'); // Redirect to login if no user in localStorage
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleAddPanel = () => {
    setPanels([...panels, { id: panels.length + 1, title: '', image: null, text: '' }]);
  };

  const handleImageChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPanels = panels.map((panel) =>
          panel.id === id ? { ...panel, image: e.target.result } : panel
        );
        setPanels(newPanels);
      };
      reader.readAsDataURL(file);
    }
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
        doc.addImage(panel.image, 'JPEG', 10, y, 180, 100);
        y += 110;
      }

      doc.setFontSize(12);
      doc.text(panel.text, 20, y);
      y += 20;
    });

    doc.save('my_comic.pdf');
  };

  return (
    <div className="home-container">
      <h1>Interactive Comic Creator</h1>
      {user && <p>Welcome, {user.username}!</p>}

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
              type="file"
              accept="image/*"
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

      <div className="home-links">
        <button
          onClick={() => {
            localStorage.removeItem('user'); // Log out by removing user data from localStorage
            navigate('/login'); // Redirect to login page
          }}
          className="home-link"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
