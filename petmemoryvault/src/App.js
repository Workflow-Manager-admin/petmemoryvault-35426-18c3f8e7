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
 * PUBLIC_INTERFACE
 * UserProfileUpload - Allows users to upload a pet profile picture & basic info, initializing in empty state.
 */
function UserProfileUpload({ onProfileSaved }) {
  const [imgSrc, setImgSrc] = useState("");
  const [form, setForm] = useState({
    name: "",
    species: "",
    birthday: "",
    bio: "",
    photo: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "photo" && files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImgSrc(url);
      setForm((prev) => ({ ...prev, photo: url, _file: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const { _file, ...profile } = form;
    onProfileSaved(profile);
  };

  return (
    <section
      style={{
        background: "#fffef7",
        boxShadow: "0 2px 12px rgba(255,179,71,0.09)",
        maxWidth: 420,
        margin: "2em auto",
        borderRadius: "1.2em",
        padding: "1.8em 2em 2em 2em",
        textAlign: "center",
      }}
      aria-label="Pet profile upload section"
    >
      <PawIllustration style={{ margin: "0 auto 1em auto", width: 72, height: 72 }} />
      <h2 style={{ color: colorPalette.primary, marginBottom: 16, fontSize: "1.55em" }}>
        Add Your Pet's Profile
      </h2>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div style={{ marginBottom: 15 }}>
          <label
            htmlFor="pet-photo-upload"
            style={{
              display: "block",
              cursor: "pointer",
              marginBottom: 7,
              color: "#8D6711",
              fontWeight: 500,
            }}
          >
            {imgSrc ? (
              <img
                src={imgSrc}
                style={{
                  width: 110,
                  height: 110,
                  objectFit: "cover",
                  borderRadius: 120,
                  border: "3px solid var(--primary)",
                  marginBottom: 3,
                }}
                alt="Pet avatar"
                className="pet-avatar"
              />
            ) : (
              <span
                style={{
                  display: "inline-block",
                  background: "#ffeece",
                  borderRadius: "100%",
                  width: 110,
                  height: 110,
                  lineHeight: "110px",
                  fontSize: "2em",
                  color: "#ccc",
                  border: "2px dashed #FFD9A6",
                  marginBottom: 3,
                }}
              >
                +
              </span>
            )}
            <br />
            <span style={{ fontSize: "0.96em", color: "#66522A" }}>
              {imgSrc ? "Change Photo" : "Upload Photo"}
            </span>
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
        <div style={{ textAlign: "left", marginBottom: 13 }}>
          <label style={{ fontWeight: 500, color: "#7f6e43" }}>
            Pet Name
            <input
              name="name"
              type="text"
              placeholder="Pet's name"
              value={form.name}
              onChange={handleInput}
              required
              autoFocus
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                fontSize: "1em",
                border: "1px solid #eddcc2",
                marginTop: 4,
                background: "#fff8e1",
                color: "#333",
              }}
              aria-label="Pet Name"
            />
          </label>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 13 }}>
          <label style={{ flex: 1, color: "#8a7750", fontWeight: 500 }}>
            Species
            <input
              name="species"
              type="text"
              placeholder="Dog, Cat, etc."
              value={form.species}
              onChange={handleInput}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                fontSize: "1em",
                border: "1px solid #eddcc2",
                marginTop: 4,
                background: "#fff8e1",
                color: "#333",
              }}
              aria-label="Pet Species"
            />
          </label>
          <label style={{ flex: 1, color: "#8a7750", fontWeight: 500 }}>
            Birthday
            <input
              name="birthday"
              type="date"
              value={form.birthday}
              onChange={handleInput}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                fontSize: "1em",
                border: "1px solid #eddcc2",
                marginTop: 4,
                background: "#fff8e1",
                color: "#333",
              }}
              aria-label="Pet Birthday"
            />
          </label>
        </div>
        <div style={{ marginBottom: 16, textAlign: "left" }}>
          <label style={{ color: "#7f6e43", fontWeight: 500 }}>
            Pet Bio (optional)
            <textarea
              name="bio"
              placeholder="A brief bio or story"
              value={form.bio}
              onChange={handleInput}
              rows={2}
              style={{
                width: "100%",
                resize: "vertical",
                borderRadius: 6,
                padding: "9px",
                fontSize: "1em",
                border: "1px solid #eddcc2",
                marginTop: 5,
                background: "#fff8e1",
                color: "#333",
              }}
              aria-label="Pet Bio"
            />
          </label>
        </div>
        <button
          className="btn btn-accent"
          type="submit"
          style={{
            width: "100%",
            padding: "13px",
            fontSize: "1.13em",
          }}
        >
          Save Profile
        </button>
        {submitted && (!form.name || !imgSrc) && (
          <div style={{ color: "#d37627", marginTop: 10, fontSize: 15 }}>
            Please provide at least a photo and a name.
          </div>
        )}
      </form>
    </section>
  );
}

/**
 * Main App Container—starts with empty user profile upload and no static demo content.
 */
function App() {
  // Single pet profile: empty at first
  const [petProfile, setPetProfile] = useState(null); // null if none

  // NEW: Add state for timeline memories and modal open state
  const [memories, setMemories] = useState([]); // Each memory: {date, text}
  const [isAddMemoryOpen, setAddMemoryOpen] = useState(false);
  const [newMemory, setNewMemory] = useState({ date: '', text: '' });

  // ----------------- Memory Modal Component -----------------
  // PUBLIC_INTERFACE
  function AddMemoryModal({ show, onSave, onClose }) {
    if (!show) return null;

    const handleChange = e => {
      const { name, value } = e.target;
      setNewMemory(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = e => {
      e.preventDefault();
      if (!newMemory.date || !newMemory.text.trim()) return; // required
      onSave({ ...newMemory });
      setNewMemory({ date: '', text: '' });
    };
    return (
      <div className="modal-backdrop" tabIndex={-1} aria-modal="true" role="dialog" onClick={onClose}>
        <div
          className="modal-content"
          style={{ minWidth: 333, maxWidth: 410 }}
          onClick={e => e.stopPropagation()}
        >
          <h3 style={{ color: colorPalette.primary, fontWeight: 600, marginBottom: 10 }}>Add Memory</h3>
          <form className="memory-form" onSubmit={handleSubmit} tabIndex={0}>
            <label>
              Date
              <input
                type="date"
                name="date"
                value={newMemory.date}
                onChange={handleChange}
                style={{marginBottom:10}}
                required
                aria-label="Memory Date"
                autoFocus
              />
            </label>
            <label>
              Description
              <textarea
                name="text"
                placeholder="Share a memory..."
                value={newMemory.text}
                onChange={handleChange}
                rows={3}
                style={{marginBottom:4}}
                required
                aria-label="Memory Description"
              />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-accent">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----------------- Timeline UI -----------------
  function Timeline({ items }) {
    // Show reverse chronological (latest first)
    if (!items.length) {
      return <div className="empty-timeline">No memories yet. Click "Add Memory" to begin.</div>;
    }
    return (
      <div className="timeline-container" style={{maxWidth:463,margin:"2.1em auto 0 auto",position:'relative'}}>
        <div className="timeline-bar" />
        {items
          .slice() // avoid mutating original
          .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
          .map((m, i) => (
            <div key={i} className="timeline-card" style={{marginBottom:"1.5em"}}>
              <div style={{
                position:'absolute',left:10,top:32,width:28,height:28,background:colorPalette.primary,
                borderRadius:14,opacity:.15
              }}></div>
              <div className="card-body">
                <div className="card-date-category">
                  <span className="card-date">{m.date}</span>
                </div>
                <div className="card-desc">{m.text}</div>
              </div>
            </div>
        ))}
      </div>
    );
  }

  // -- main --
  return (
    <div className="pmv-app app-light" style={rootStyle}>
      <nav className="pmv-navbar">
        <span className="navbar-logo" style={{ color: colorPalette.primary }}>
          🐾 PetMemoryVault
        </span>
      </nav>
      <main className="pmv-content" style={{ maxWidth: 600, margin: "0 auto" }}>
        {!petProfile ? (
          <UserProfileUpload onProfileSaved={profile => setPetProfile(profile)} />
        ) : (
          <>
            <section
              className="pet-profile-card"
              style={{
                margin: "2em auto",
                maxWidth: 430,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(214, 181, 120, 0.10)",
                padding: "2em 1.5em 1.7em 1.5em",
                borderRadius: "1.2em",
                display: "flex",
                gap: "1.5em",
                alignItems: "center",
                flexDirection: "row"
              }}
              aria-label="Pet profile summary"
            >
              <div>
                <img
                  className="pet-avatar"
                  src={petProfile.photo || "https://placehold.co/120x120?text=Pet"}
                  alt={`Avatar of ${petProfile.name}`}
                  style={{ width: 120, height: 120, borderRadius: 80, objectFit: "cover", border: "3px solid var(--primary)" }}
                />
              </div>
              <div>
                <h2 style={{ color: "#835D09", marginBottom: 5 }}>{petProfile.name}</h2>
                <div className="pet-details" style={{ marginBottom: 7 }}>
                  <span>
                    Species: <span style={{ color: "#6EC6CA" }}>{petProfile.species || "—"}</span>
                  </span>
                  <span>
                    Birthday: <span style={{ color: "#6EC6CA" }}>{petProfile.birthday || "—"}</span>
                  </span>
                </div>
                {petProfile.bio && (
                  <div className="pet-bio" style={{ color: "#786C51" }}>{petProfile.bio}</div>
                )}
              </div>
            </section>
            {/* Timeline & Add Memory */}
            <section style={{ margin: "2.3em auto 0 auto", maxWidth: 480 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
                <h3 style={{ margin: 0, color: "#45350E", fontWeight: 600, fontSize: "1.25em" }}>
                  Timeline
                </h3>
                <button
                  className="btn btn-accent"
                  type="button"
                  style={{padding:'7px 20px',fontSize:'1em'}}
                  onClick={() => setAddMemoryOpen(true)}
                  aria-label="Add Memory"
                >
                  + Add Memory
                </button>
              </div>
              <Timeline items={memories} />
            </section>
            <AddMemoryModal
              show={isAddMemoryOpen}
              onSave={mem => {
                setMemories(prev => [...prev, mem]);
                setAddMemoryOpen(false);
              }}
              onClose={() => { setAddMemoryOpen(false); setNewMemory({ date: '', text: '' }); }}
            />
          </>
        )}
      </main>
      <footer className="pmv-footer">
        <span>
          © {new Date().getFullYear()} PetMemoryVault · Celebrate every pawprint
        </span>
      </footer>
    </div>
  );
}

export default App;
