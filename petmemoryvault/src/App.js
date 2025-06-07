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

  // Timeline state
  const [memories, setMemories] = useState([]); // Each memory: {date, text}
  const [isAddMemoryOpen, setAddMemoryOpen] = useState(false);
  const [newMemory, setNewMemory] = useState({ date: '', text: '' });

  // New: Photos state
  const [photos, setPhotos] = useState([]); // Each: { url: string, name: string }
  // Milestones state: each { title, date, description, image (URL), imageName }
  const [milestones, setMilestones] = useState([]); 
  const [milestoneModal, setMilestoneModal] = useState({ open: false, editIdx: null });
  const [milestoneForm, setMilestoneForm] = useState({ title: '', date: '', description: '', image: '', imageName: '' });
  const [milestoneFormError, setMilestoneFormError] = useState('');
  const [selectedPage, setSelectedPage] = useState('timeline'); // 'timeline' or 'photos' or 'milestones'

  // PUBLIC_INTERFACE
  function AddMemoryModal({ show, onSave, onClose }) {
    if (!show) return null;
    const handleChange = e => {
      const { name, value } = e.target;
      setNewMemory(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = e => {
      e.preventDefault();
      if (!newMemory.date || !newMemory.text.trim()) return;
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

  // PUBLIC_INTERFACE
  function Timeline({ items }) {
    if (!items.length) {
      return <div className="empty-timeline">No memories yet. Click "Add Memory" to begin.</div>;
    }
    return (
      <div className="timeline-container" style={{maxWidth:463,margin:"2.1em auto 0 auto",position:'relative'}}>
        <div className="timeline-bar" />
        {items
          .slice()
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

  // PUBLIC_INTERFACE
  function PhotosPage({ photos, onAddPhoto }) {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const handlePhotoChange = e => {
      setUploadError('');
      setUploading(true);
      const file = e.target.files && e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const url = evt.target.result;
          onAddPhoto({ url, name: file.name });
          setUploading(false);
        };
        reader.onerror = () => {
          setUploadError('Error reading image file.');
          setUploading(false);
        };
        reader.readAsDataURL(file);
      } else {
        setUploadError('Please select an image file.');
        setUploading(false);
      }
      e.target.value = ''; // allow same file re-upload
    };

    return (
      <section style={{ maxWidth: 520, margin: "2.6em auto 0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ margin: 0, color: "#45350E", fontWeight: 600, fontSize: "1.23em" }}>
            Photos
          </h3>
          <label
            htmlFor="photo-upload-input"
            style={{
              background: "var(--primary)",
              color: "#fff",
              padding: "9px 18px",
              borderRadius: 5,
              fontWeight: 500,
              fontSize: "1em",
              cursor: "pointer",
              border: "none",
              boxShadow: "0 1px 5px #ffd17b42",
              display: "inline-block"
            }}
            aria-label="Upload Photo"
          >
            + Upload Photo
            <input
              type="file"
              id="photo-upload-input"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        {uploadError && <div style={{ color: "#d37627", marginBottom: 10 }}>{uploadError}</div>}
        {photos.length === 0 && (
          <div className="empty-timeline" style={{marginTop: 32, marginBottom: 32}}>
            No photos uploaded yet.<br/>Your pet's photo gallery will appear here.
          </div>
        )}
        {photos.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1.3em",
              marginTop: 18
            }}
            className="photos-gallery-grid"
          >
            {photos.map((photo, idx) => (
              <div key={idx} style={{
                background: "#fff",
                borderRadius: "0.7em",
                boxShadow: "0 1px 7px #ffd37611",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 120
              }}>
                <img
                  src={photo.url}
                  alt={`Pet photo ${idx + 1}`}
                  style={{
                    width: "100%",
                    maxWidth: 170,
                    maxHeight: 140,
                    objectFit: "cover",
                    borderRadius: "0.5em",
                    marginBottom: 7,
                    background: "#ffe",
                    border: "1.3px solid var(--primary)"
                  }}
                />
                <div style={{
                  fontSize: ".97em",
                  color: "#A37F41",
                  marginTop: 2,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: 150
                }}>{photo.name}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  // -- main render --
  return (
    <div className="pmv-app app-light" style={rootStyle}>
      <nav className="pmv-navbar">
        <span className="navbar-logo" style={{ color: colorPalette.primary }}>
          🐾 PetMemoryVault
        </span>
        {petProfile && (
          <div style={{ display: "flex", gap: "1.6em" }}>
            <button
              className={`navbar-btn${selectedPage === 'timeline' ? ' active' : ''}`}
              onClick={() => setSelectedPage('timeline')}
              type="button"
              style={{
                border: "none",
                background: "none",
                fontWeight: 500,
                color: selectedPage === 'timeline' ? colorPalette.primary : "#B78943",
                borderBottom: selectedPage === 'timeline' ? "2px solid var(--primary)" : "2px solid transparent",
                cursor: "pointer",
                fontSize: "1.07em"
              }}
            >Timeline</button>
            <button
              className={`navbar-btn${selectedPage === 'milestones' ? ' active' : ''}`}
              onClick={() => setSelectedPage('milestones')}
              type="button"
              style={{
                border: "none",
                background: "none",
                fontWeight: 500,
                color: selectedPage === 'milestones' ? colorPalette.primary : "#B78943",
                borderBottom: selectedPage === 'milestones' ? "2px solid var(--primary)" : "2px solid transparent",
                cursor: "pointer",
                fontSize: "1.07em"
              }}
            >Milestones</button>
            <button
              className={`navbar-btn${selectedPage === 'photos' ? ' active' : ''}`}
              onClick={() => setSelectedPage('photos')}
              type="button"
              style={{
                border: "none",
                background: "none",
                fontWeight: 500,
                color: selectedPage === 'photos' ? colorPalette.primary : "#B78943",
                borderBottom: selectedPage === 'photos' ? "2px solid var(--primary)" : "2px solid transparent",
                cursor: "pointer",
                fontSize: "1.07em"
              }}
            >Photos</button>
          </div>
        )}
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
            {selectedPage === "timeline" && (
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
                <AddMemoryModal
                  show={isAddMemoryOpen}
                  onSave={mem => {
                    setMemories(prev => [...prev, mem]);
                    setAddMemoryOpen(false);
                  }}
                  onClose={() => { setAddMemoryOpen(false); setNewMemory({ date: '', text: '' }); }}
                />
              </section>
            )}
            {selectedPage === "photos" && (
              <PhotosPage
                photos={photos}
                onAddPhoto={photo => setPhotos(prev => [...prev, photo])}
              />
            )}
            {selectedPage === "milestones" && (
              <>
                <MilestonesPage
                  milestones={milestones}
                  onAdd={() => {
                    setMilestoneForm({ title: '', date: '', description: '', image: '', imageName: '' });
                    setMilestoneModal({ open: true, editIdx: null });
                    setMilestoneFormError('');
                  }}
                  onEdit={idx => {
                    const m = milestones[idx];
                    setMilestoneForm({ ...m });
                    setMilestoneModal({ open: true, editIdx: idx });
                    setMilestoneFormError('');
                  }}
                />
                {milestoneModal.open && (
                  <MilestoneModal
                    open={milestoneModal.open}
                    milestone={milestoneForm}
                    setMilestone={setMilestoneForm}
                    error={milestoneFormError}
                    setError={setMilestoneFormError}
                    onCancel={() => { setMilestoneModal({ open: false, editIdx: null }); setMilestoneFormError(''); }}
                    onSave={() => {
                      if (!milestoneForm.title.trim() || !milestoneForm.date) {
                        setMilestoneFormError("Please provide a title and date.");
                        return;
                      }
                      setMilestones(prev => {
                        if (milestoneModal.editIdx === null) {
                          // Add new
                          return [...prev, { ...milestoneForm }];
                        } else {
                          // Edit
                          return prev.map((item, idx) => 
                            idx === milestoneModal.editIdx ? { ...milestoneForm } : item
                          );
                        }
                      });
                      setMilestoneModal({ open: false, editIdx: null });
                    }}
                  />
                )}
              </>
            )}
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

/**
 * PUBLIC_INTERFACE
 * MilestonesPage - List milestones and allow add/edit, fully in app state.
 */
function MilestonesPage({ milestones, onAdd, onEdit }) {
  return (
    <section style={{ maxWidth: 540, margin: "2.4em auto 0 auto" }} className="milestones-view">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <h3 style={{ margin: 0, color: "#45350E", fontWeight: 600, fontSize: "1.21em" }}>
          Milestones
        </h3>
        <button
          className="btn btn-accent"
          type="button"
          aria-label="Add Milestone"
          onClick={onAdd}
          style={{ padding: "7px 20px", fontSize: "1em" }}
        >
          + Add Milestone
        </button>
      </div>
      {!milestones.length && (
        <div className="empty-timeline" style={{ marginTop: 28, marginBottom: 32 }}>
          No milestones to show yet.<br />Add a milestone to celebrate special moments!
        </div>
      )}
      {milestones.length > 0 && (
        <div className="milestones-list">
          {milestones
            .slice()
            .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
            .map((m, idx) => (
              <div key={idx} className="timeline-card milestone" style={{marginBottom:"1.5em", position:"relative"}}>
                {m.image && (
                  <img src={m.image} alt={m.imageName||'Milestone photo'} className="card-photo" style={{marginRight:10}} />
                )}
                <div className="card-body">
                  <div className="card-date-category">
                    <span className="card-date">{m.date}</span>
                    <span className="card-category">Milestone</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "1.14em", color: "#a07a31", marginBottom: 7 }}>{m.title}</div>
                  {m.description && (<div className="card-desc">{m.description}</div>)}
                  <div className="card-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      style={{ marginTop:4, fontSize:"0.96em" }}
                      onClick={() => onEdit(idx)}
                      aria-label="Edit Milestone"
                    >Edit</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * MilestoneModal - Modal dialog for add/edit milestone (keeps local controlled state).
 */
function MilestoneModal({ open, milestone, setMilestone, error, setError, onCancel, onSave }) {
  if (!open) return null;
  const { title, date, description, image, imageName } = milestone;
  function handleInput(e) {
    const { name, value } = e.target;
    setMilestone(prev => ({ ...prev, [name]: value }));
    setError('');
  }
  function handleFileInput(e) {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = evt => {
        setMilestone(prev => ({ ...prev, image: evt.target.result, imageName: file.name }));
      };
      reader.readAsDataURL(file);
    } else {
      setMilestone(prev => ({ ...prev, image: '', imageName: '' }));
    }
    e.target.value = '';
  }

  return (
    <div className="modal-backdrop" tabIndex={-1} aria-modal="true" role="dialog" onClick={onCancel}>
      <div
        className="modal-content"
        style={{ minWidth: 343, maxWidth: 480 }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ color: colorPalette.primary, fontWeight: 600, marginBottom: 13, marginTop:3 }}>
          {milestone && milestone.imageName ? 'Edit Milestone' : 'Add Milestone'}
        </h3>
        <form className="memory-form" onSubmit={e => { e.preventDefault(); onSave(); }} tabIndex={0}>
          <label>
            Title<span style={{color:'#e87a41'}}>*</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInput}
              required
              aria-label="Milestone Title"
              autoFocus
              placeholder="e.g. First Birthday"
              style={{marginBottom:8}}
            />
          </label>
          <label>
            Date<span style={{color:'#e87a41'}}>*</span>
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleInput}
              required
              aria-label="Milestone Date"
              style={{marginBottom:10}}
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              placeholder="Describe this special moment (optional)"
              value={description}
              onChange={handleInput}
              rows={3}
              style={{marginBottom:4}}
              aria-label="Milestone Description"
            />
          </label>
          <label>
            Image (optional)
            {image && (
              <div>
                <img src={image} alt={imageName||'Milestone'} className="photo-preview" style={{maxHeight:60, marginBottom:3, marginTop:3}}/>
                <span style={{color:"#7b6a3d", fontSize:"0.97em"}}>{imageName}</span>
              </div>
            )}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileInput}
              style={{marginTop:6, marginBottom:2}}
              aria-label="Milestone Image"
            />
          </label>
          {error && <div style={{ color: "#ca5842", marginTop: 5, fontSize: "0.99em" }}>{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-accent">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
