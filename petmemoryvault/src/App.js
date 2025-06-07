import React, { useState } from "react";
import "./App.css";

/*
 * PAW ILLUSTRATION: SVG as a placeholder for the beautiful homepage image.
 */
const PawIllustration = ({ style }) => (
  <svg
    style={style}
    width="128"
    height="128"
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Paw print illustration"
  >
    <circle cx="38" cy="56" r="24" fill="#FFB347" stroke="#FFD9A6" strokeWidth="4" />
    <circle cx="128" cy="56" r="24" fill="#FFB347" stroke="#FFD9A6" strokeWidth="4" />
    <ellipse cx="83" cy="110" rx="36" ry="42" fill="#FFB347" stroke="#FFD9A6" strokeWidth="5" />
    <circle cx="23" cy="28" r="13" fill="#FFD9A6" />
    <circle cx="143" cy="28" r="13" fill="#FFD9A6" />
  </svg>
);

const colorPalette = {
  primary: "#FFB347",
  secondary: "#FFF8E1",
  accent: "#6EC6CA",
};

const rootStyle = {
  "--primary": colorPalette.primary,
  "--secondary": colorPalette.secondary,
  "--accent": colorPalette.accent,
  "--app-bg": "#f9f6f0",
  "--card-bg": "#fff",
  "--sidebar-bg": "#fff8e1",
  "--text-heading": "#333",
  "--text-body": "#555",
  "--timeline-bar": "#6EC6CA",
  "--milestone-bg": "#FFFAF1",
  "--modal-bg": "#fff",
};

/**
 * Pet Profile Component with Editable and Upload UI
 * - Allows user to upload a pet photo, and edit name/species/birthday/bio inline.
 */
// PUBLIC_INTERFACE
function PetProfile({ profile, onProfileUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);

  React.useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleEditClick = () => setEditMode(true);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setForm((old) => ({ ...old, photo: url, _file: file }));
    } else {
      setForm((old) => ({ ...old, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    const { _file, ...updated } = form;
    onProfileUpdate(updated);
  };

  return (
    <section className="pet-profile-card" aria-label="Pet profile section">
      <div>
        <label htmlFor="pet-photo-upload">
          <img
            className="pet-avatar"
            src={form.photo || "https://placehold.co/120x120?text=Pet"}
            alt={`Avatar of ${form.name || "your pet"}`}
            style={{ cursor: "pointer" }}
            title="Click to upload/change photo"
          />
        </label>
        <input
          id="pet-photo-upload"
          type="file"
          name="photo"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleInput}
        />
      </div>
      <div>
        {!editMode ? (
          <>
            <h2 onClick={handleEditClick} style={{ cursor: "pointer", color: "#8D6711" }}>
              {form.name || "Click to name your pet"}
            </h2>
            <div className="pet-details">
              <span>
                Species:{" "}
                <span style={{ cursor: "pointer" }} onClick={handleEditClick}>
                  {form.species || "—"}
                </span>
              </span>
              <span>
                Birthday:{" "}
                <span style={{ cursor: "pointer" }} onClick={handleEditClick}>
                  {form.birthday || "—"}
                </span>
              </span>
            </div>
            <div
              className="pet-bio"
              style={{ cursor: "pointer", color: "#786C51" }}
              onClick={handleEditClick}
            >
              {form.bio || "Click to add your pet's bio/story!"}
            </div>
            <button
              className="btn btn-sm btn-accent"
              style={{ marginTop: 6 }}
              onClick={handleEditClick}
              aria-label="Edit pet profile"
            >
              Edit
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>
              <input
                type="text"
                name="name"
                required
                placeholder="Pet Name"
                value={form.name}
                onChange={handleInput}
                style={{
                  fontSize: "1.17em",
                  width: "98%",
                  borderRadius: "6px",
                  border: "1.2px solid #eddcc2",
                  marginBottom: 6,
                  padding: "6px 8px",
                }}
                aria-label="Pet Name"
                autoFocus
              />
            </h2>
            <div className="pet-details">
              <span>
                Species:{" "}
                <input
                  type="text"
                  name="species"
                  placeholder="Dog, Cat, etc."
                  value={form.species}
                  onChange={handleInput}
                  style={{
                    width: 80,
                    borderRadius: "4px",
                    border: "1px solid #eddcc2",
                    padding: "3px 6px",
                  }}
                  aria-label="Species"
                />
              </span>
              <span>
                Birthday:{" "}
                <input
                  type="date"
                  name="birthday"
                  value={form.birthday}
                  onChange={handleInput}
                  style={{
                    width: 120,
                    borderRadius: "4px",
                    border: "1px solid #eddcc2",
                    padding: "3px 6px",
                  }}
                  aria-label="Pet Birthday"
                />
              </span>
            </div>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleInput}
              rows={2}
              placeholder="Describe your pet's personality/story!"
              style={{
                width: "98%",
                marginTop: "9px",
                borderRadius: "6px",
                border: "1.2px solid #eddcc2",
                padding: "7px 8px",
                fontSize: "1em",
              }}
              aria-label="Pet Bio"
            />
            <div className="modal-actions" style={{ marginTop: 13 }}>
              <button className="btn btn-accent btn-sm" type="submit">
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={() => {
                  setEditMode(false); setForm(profile);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/**
 * Timeline Card (Memory or Milestone)
 */
// PUBLIC_INTERFACE
function TimelineCard({ memory, onEdit, onShare }) {
  const isMilestone = !!memory.isMilestone;
  return (
    <div className={isMilestone ? "timeline-card milestone" : "timeline-card"}>
      {memory.photo && (
        <img className="card-photo" src={memory.photo} alt="memory" />
      )}
      <div className="card-body">
        <div className="card-date-category">
          <span className="card-date">{memory.date}</span>
          {memory.category && (
            <span className="card-category">{memory.category}</span>
          )}
        </div>
        <div className="card-desc">{memory.description}</div>
        {isMilestone && (
          <div className="milestone-label">Milestone</div>
        )}
        <div className="card-actions">
          <button className="btn btn-sm" onClick={() => onEdit(memory)}>
            Edit
          </button>
          <button className="btn btn-sm" onClick={() => onShare(memory)}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Timeline List
 */
// PUBLIC_INTERFACE
function Timeline({ memories, onEdit, onShare }) {
  const sorted = [...memories].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <section className="timeline-container">
      <div className="timeline-bar" />
      {sorted.length === 0 && (
        <div className="empty-timeline">
          No memories yet. Start by adding your first memory!
        </div>
      )}
      {sorted.map((memory) => (
        <TimelineCard
          key={memory.id}
          memory={memory}
          onEdit={onEdit}
          onShare={onShare}
        />
      ))}
    </section>
  );
}

/**
 * Add Memory Modal
 */
function AddMemoryModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    photo: null,
    description: "",
    date: "",
    category: "",
    isMilestone: false,
  });

  const handleInput = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setForm((f) => ({ ...f, photo: url }));
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.date) {
      alert("Please enter at least a date & description");
      return;
    }
    onSave({ ...form, id: Date.now() });
    setForm({
      photo: null,
      description: "",
      date: "",
      category: "",
      isMilestone: false,
    });
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3>Add a Memory or Milestone</h3>
        <form className="memory-form" onSubmit={handleSubmit}>
          <label>
            Photo:
            <input type="file" name="photo" accept="image/*" onChange={handleInput} />
          </label>
          {form.photo && (
            <img
              src={form.photo}
              alt="preview"
              className="photo-preview"
              style={{ maxHeight: 80, margin: "0.5em 0" }}
            />
          )}
          <label>
            Description:
            <textarea
              name="description"
              value={form.description}
              onChange={handleInput}
              rows={3}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleInput}
              required
            />
          </label>
          <label>
            Category/Tag:
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleInput}
              placeholder="e.g. Birthday, Walk"
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="isMilestone"
              checked={form.isMilestone}
              onChange={handleInput}
            />
            Mark as Milestone
          </label>
          <div className="modal-actions">
            <button className="btn btn-accent" type="submit">
              Save
            </button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Sidebar with navigation and actions
 */
// PUBLIC_INTERFACE
function Sidebar({ onGoScrapbook, onGoTimeline, onGoMilestones, onShare, selectedView }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <button
          className={selectedView === "timeline" ? "sidebar-btn active" : "sidebar-btn"}
          onClick={onGoTimeline}
        >
          🏠 Timeline
        </button>
        <button
          className={selectedView === "scrapbook" ? "sidebar-btn active" : "sidebar-btn"}
          onClick={onGoScrapbook}
        >
          📒 Scrapbook
        </button>
        <button
          className={selectedView === "milestones" ? "sidebar-btn active" : "sidebar-btn"}
          onClick={onGoMilestones}
        >
          ⭐ Milestones
        </button>
      </div>
      <div className="sidebar-section bottom">
        <button className="sidebar-btn" onClick={onShare}>
          🔗 Share
        </button>
      </div>
    </aside>
  );
}

/**
 * Scrapbook (printable view)
 */
// PUBLIC_INTERFACE
function Scrapbook({ memories, onEdit }) {
  const sorted = [...memories].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <section className="scrapbook-view">
      <h2>Printable Memory Scrapbook</h2>
      <div className="scrapbook-grid">
        {sorted.length === 0 && (
          <div className="empty-timeline">
            No memories yet. Start by adding your first memory!
          </div>
        )}
        {sorted.map((m) => (
          <div
            key={m.id}
            className={
              m.isMilestone
                ? "scrapbook-card milestone"
                : m.photo
                  ? "scrapbook-card"
                  : "scrapbook-card"
            }
          >
            {m.photo && (
              <img src={m.photo} alt="memory" className="scrapbook-photo" />
            )}
            <div className="scrapbook-body">
              <div className="scrapbook-date-category">
                <span>{m.date}</span>
                {m.category && <span className="scrapbook-category">{m.category}</span>}
              </div>
              <div
                className="scrapbook-desc"
                contentEditable // PUBLIC_INTERFACE: allow live inline editing of description
                suppressContentEditableWarning
                spellCheck={true}
                onBlur={(e) => onEdit({ ...m, description: e.target.textContent })}
                aria-label="Edit description"
                tabIndex={0}
                style={{ outline: "none" }}
              >
                {m.description}
              </div>
              {m.isMilestone && <div className="milestone-label">Milestone</div>}
              {m.photo && <div style={{ color: "#FFA033", fontSize: "0.88em", marginTop: 2 }}>Photo</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="print-actions">
        <button className="btn btn-accent" onClick={() => window.print()}>
          Print Scrapbook
        </button>
      </div>
    </section>
  );
}

/**
 * Share Modal (Placeholder)
 */
function ShareModal({ isOpen, onClose }) {
  const shareUrl = "https://petmemoryvault.app/story/12345"; // Placeholder URL
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: 350 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Share Your Pet's Story</h3>
        <div className="share-link-section">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="share-link-input"
            onClick={(e) => e.target.select()}
            aria-label="Share link"
          />
          <button
            className="btn btn-accent"
            style={{ marginTop: 8 }}
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert("Link copied!");
              onClose();
            }}
          >
            Copy Link
          </button>
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: "#777" }}>
          Share this link with friends or family.
        </div>
      </div>
    </div>
  );
}

/**
 * Milestones View (filtered list)
 */
// PUBLIC_INTERFACE
function MilestonesView({ memories, onEdit, onShare }) {
  const milestoneMemories = memories.filter((m) => m.isMilestone);
  return (
    <section className="milestones-view">
      <h2>Milestones</h2>
      {milestoneMemories.length === 0 && (
        <div className="empty-timeline">
          No milestones yet. Mark some memories as milestones!
        </div>
      )}
      <div className="milestones-list">
        {milestoneMemories.map((m) => (
          <TimelineCard
            key={m.id}
            memory={m}
            onEdit={onEdit}
            onShare={onShare}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Main App Container (No demo 'Bella' data anywhere)
 */
function App() {
  // Pet profile is empty initially
  const [petProfile, setPetProfile] = useState({
    name: "",
    species: "",
    birthday: "",
    photo: "",
    bio: "",
  });
  // Timeline/memories
  const [memories, setMemories] = useState([]);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalShareOpen, setModalShareOpen] = useState(false);

  const [currentView, setCurrentView] = useState("timeline");

  const handleAddMemory = (data) => {
    setMemories((prev) => [...prev, data]);
  };
  const handleEditMemory = (edited) => {
    setMemories((prev) => prev.map((m) => (m.id === edited.id ? edited : m)));
  };
  const handlePetProfileUpdate = (updated) => setPetProfile(updated);
  const handleShare = () => setModalShareOpen(true);

  let mainContent;
  if (currentView === "scrapbook") {
    mainContent = <Scrapbook memories={memories} onEdit={handleEditMemory} />;
  } else if (currentView === "milestones") {
    mainContent = (
      <MilestonesView memories={memories} onEdit={handleEditMemory} onShare={handleShare} />
    );
  } else {
    mainContent = (
      <>
        <PetProfile profile={petProfile} onProfileUpdate={handlePetProfileUpdate} />
        {memories.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#fffef7",
              borderRadius: "1.2em",
              boxShadow: "0 2px 12px rgba(255,179,71,0.07)",
              margin: "0 auto 2em auto",
              padding: "2em 1em 1.75em 1em",
              maxWidth: 520,
            }}
          >
            <PawIllustration style={{ marginBottom: 16, width: 96, height: 96 }} />
            <h2 style={{ color: colorPalette.primary, margin: "0.5em 0 0.2em 0" }}>
              Welcome to Your Pet's Memory Vault!
            </h2>
            <div style={{ color: "#666", fontSize: "1.09em", marginBottom: 18, textAlign: "center" }}>
              Celebrate every special moment—add your first memory, photo, or milestone.
            </div>
            <button
              className="btn btn-accent"
              style={{ fontSize: "1.11em", padding: "12px 36px" }}
              onClick={() => setModalAddOpen(true)}
            >
              + Add Memory
            </button>
          </div>
        )}
        {memories.length > 0 && (
          <div style={{ marginBottom: "1.75rem", textAlign: "center" }}>
            <button
              className="btn btn-accent"
              style={{ fontSize: "1.06em", padding: "11px 32px" }}
              onClick={() => setModalAddOpen(true)}
            >
              + Add Memory
            </button>
          </div>
        )}
        <Timeline memories={memories} onEdit={handleEditMemory} onShare={handleShare} />
      </>
    );
  }

  return (
    <div className="pmv-app app-light" style={rootStyle}>
      <nav className="pmv-navbar">
        <span className="navbar-logo" style={{ color: colorPalette.primary }}>
          🐾 PetMemoryVault
        </span>
        <span className="navbar-linkset">
          <button
            className={
              currentView === "timeline" ? "navbar-btn active" : "navbar-btn"
            }
            onClick={() => setCurrentView("timeline")}
          >
            Timeline
          </button>
          <button
            className={
              currentView === "scrapbook" ? "navbar-btn active" : "navbar-btn"
            }
            onClick={() => setCurrentView("scrapbook")}
          >
            Scrapbook
          </button>
          <button
            className={
              currentView === "milestones" ? "navbar-btn active" : "navbar-btn"
            }
            onClick={() => setCurrentView("milestones")}
          >
            Milestones
          </button>
        </span>
      </nav>
      <div className="pmv-main">
        <Sidebar
          onGoScrapbook={() => setCurrentView("scrapbook")}
          onGoTimeline={() => setCurrentView("timeline")}
          onGoMilestones={() => setCurrentView("milestones")}
          onShare={handleShare}
          selectedView={currentView}
        />
        <main className="pmv-content">{mainContent}</main>
      </div>
      <AddMemoryModal
        isOpen={modalAddOpen}
        onClose={() => setModalAddOpen(false)}
        onSave={handleAddMemory}
      />
      <ShareModal isOpen={modalShareOpen} onClose={() => setModalShareOpen(false)} />
      <footer className="pmv-footer">
        <span>
          © {new Date().getFullYear()} PetMemoryVault · Celebrate every pawprint
        </span>
      </footer>
    </div>
  );
}

export default App;
