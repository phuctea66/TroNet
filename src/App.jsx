import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  Home as HomeIcon,
  KeyRound,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  UsersRound,
  Wifi,
  X,
} from "lucide-react";
import { initialRooms } from "./data/mockRooms.js";
import { initialProfiles } from "./data/mockProfiles.js";
import { initialConnections, initialMessages } from "./data/mockConnections.js";
import { calculateCompatibility } from "./utils/compatibility.js";

const DataContext = createContext(null);
const useData = () => useContext(DataContext);
const read = (key, fallback) => {
  try {
    const item = localStorage.getItem(`tronest:${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};
const money = (n) =>
  `${(Number(n || 0) / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 })}M VND`;
const areaList = [
  "Cau Giay",
  "Thanh Xuan",
  "Dong Da",
  "Ha Dong",
  "Nam Tu Liem",
  "Ba Dinh",
];
const habitNames = {
  sleep: "Sleep schedule",
  smoking: "Smoking",
  pets: "Pets",
  cooking: "Cooking",
  cleanliness: "Cleanliness",
  guests: "Guests",
};
const areaImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1493809842364-78817add4b3?auto=format&fit=crop&w=1200&q=85",
];

function DataProvider({ children }) {
  const [rooms, setRooms] = useState(() => read("rooms", initialRooms));
  const [profiles, setProfiles] = useState(() =>
    read("profiles", initialProfiles),
  );
  const [connections, setConnections] = useState(() =>
    read("connections", initialConnections),
  );
  const [messages, setMessages] = useState(() =>
    read("messages", initialMessages),
  );
  const [user, setUser] = useState(() => read("user", null));
  useEffect(
    () => localStorage.setItem("tronest:rooms", JSON.stringify(rooms)),
    [rooms],
  );
  useEffect(
    () => localStorage.setItem("tronest:profiles", JSON.stringify(profiles)),
    [profiles],
  );
  useEffect(
    () =>
      localStorage.setItem("tronest:connections", JSON.stringify(connections)),
    [connections],
  );
  useEffect(
    () => localStorage.setItem("tronest:messages", JSON.stringify(messages)),
    [messages],
  );
  useEffect(
    () => localStorage.setItem("tronest:user", JSON.stringify(user)),
    [user],
  );
  const value = {
    rooms,
    setRooms,
    profiles,
    setProfiles,
    connections,
    setConnections,
    messages,
    setMessages,
    user,
    setUser,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label="TroNest home"
    >
      <span className="logo-mark">
        <HomeIcon size={19} strokeWidth={2.5} />
        <i />
      </span>
      <span>
        tro<span>Nest</span>
      </span>
    </Link>
  );
}
function Header() {
  const { user, setUser } = useData();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <button
          className="mobile-toggle icon-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`nav ${open ? "nav-open" : ""}`}>
          <NavLink to="/rooms">Find a room</NavLink>
          <NavLink to="/roommates">Find a roommate</NavLink>
          {user && (
            <NavLink to="/connections" className="nav-connection">
              Connections
            </NavLink>
          )}
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
          {user ? (
            <div className="user-nav">
              <img
                className="avatar avatar-small"
                src={
                  user.avatar ||
                  (user.role === "admin"
                    ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                    : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80")
                }
                alt={user.name}
              />
              <div className="user-nav-details">
                <span className="user-nav-name">{user.name}</span>
                <span className={`role-pill role-pill-${user.role || "user"}`}>
                  {user.role === "admin" ? "Admin" : "User"}
                </span>
              </div>
              <button
                className="text-button"
                onClick={() => {
                  setUser(null);
                }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="button button-primary button-small">
              Sign in <ArrowRight size={15} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  const { setRooms, setProfiles, setConnections, setMessages, setUser } =
    useData();
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Logo />
          <p>A better place to land — and someone to share it with.</p>
        </div>
        <div className="footer-links">
          <Link to="/rooms">Find a room</Link>
          <Link to="/roommates">Find a roommate</Link>
          <Link to="/login">Demo login</Link>
        </div>
        <div className="footer-note">
          Made for your next chapter <Sparkles size={14} className="inline text-brand-gold" aria-hidden="true" />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 TroNest. A home for new beginnings.</span>
        <button
          className="text-button"
          onClick={() => {
            if (confirm("Reset all demo data on this device?")) {
              ["rooms", "profiles", "connections", "messages", "user"].forEach(
                (k) => localStorage.removeItem(`tronest:${k}`),
              );
              setRooms(initialRooms);
              setProfiles(initialProfiles);
              setConnections(initialConnections);
              setMessages(initialMessages);
              setUser(null);
            }
          }}
        >
          Reset demo data
        </button>
      </div>
    </footer>
  );
}
function Shell({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
function RoomCard({ room, compact = false }) {
  return (
    <Link
      to={`/rooms/${room.id}`}
      className={`room-card ${compact ? "room-card-compact" : ""}`}
    >
      <div className="room-image-wrap">
        <img
          src={room.images?.[0] || areaImages[0]}
          alt={room.title}
          loading="lazy"
        />
        <span className="image-tag">{room.area}</span>
        <button
          className="heart-button"
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.classList.toggle("liked");
          }}
          aria-label={`Save ${room.title} to favorites`}
        >
          <Heart size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="room-card-content">
        <div className="room-card-title">
          <h3>{room.title}</h3>
          <span className="price">
            {money(room.price)}
            <small>/mo</small>
          </span>
        </div>
        <p className="muted location">
          <MapPin size={15} aria-hidden="true" />
          {room.address}
        </p>
        <div className="room-meta">
          <span>
            <BedDouble size={15} aria-hidden="true" />
            {room.size} m²
          </span>
          <span>
            <Bath size={15} aria-hidden="true" />
            Private bath
          </span>
          <span>
            <Wifi size={15} aria-hidden="true" />
            Wi-Fi
          </span>
        </div>
      </div>
    </Link>
  );
}
function ProfileCard({ profile, matched = false }) {
  const type = profile.type === "has-room";
  return (
    <Link to={`/roommates/${profile.id}`} className="profile-card">
      <div className="profile-card-head">
        <img
          className="avatar avatar-large"
          src={profile.avatar || `https://i.pravatar.cc/180?u=${profile.id}`}
          alt={profile.displayName}
          loading="lazy"
        />
        <div className="profile-title">
          <div className="profile-name-row">
            <h3>{profile.displayName}</h3>
            {matched && (
              <span className="match-pill">
                <Check size={12} aria-hidden="true" />
                Connected
              </span>
            )}
          </div>
          <p>
            <MapPin size={14} aria-hidden="true" />
            {profile.area}
          </p>
        </div>
        <span className="profile-arrow">
          <ArrowRight size={17} aria-hidden="true" />
        </span>
      </div>
      <div className="profile-type">
        {type ? "Has a room" : "Looking for a room"} <span>·</span> Move-in{" "}
        {new Date(profile.moveInDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </div>
      <p className="profile-intro">{profile.intro}</p>
      <div className="profile-card-foot">
        <strong>
          Up to {money(profile.budget)}
          <small> / person</small>
        </strong>
        <div className="tag-list">
          {Object.entries(profile.habits || {})
            .slice(0, 2)
            .map(([k, v]) => (
              <span className="tag" key={k}>
                {String(v).replaceAll("-", " ")}
              </span>
            ))}
        </div>
      </div>
    </Link>
  );
}
function SectionHeading({ kicker, title, action, to }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {action && (
        <Link className="inline-link" to={to}>
          {action}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
function Home() {
  const { rooms, profiles } = useData();
  const roomResults = rooms
    .filter((r) => r.status === "published" && !r.hidden)
    .slice(0, 3);
  const people = profiles.filter((p) => p.id !== "profile-me").slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <Sparkles size={14} /> FIND YOUR PLACE, FIND YOUR PEOPLE
            </span>
            <h1>
              A home feels better
              <br />
              when it <em>feels like you.</em>
            </h1>
            <p>
              Find a room that fits your life — and a roommate who might just
              become your favorite part of it.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/rooms">
                Explore rooms <ArrowRight size={17} />
              </Link>
              <Link className="button button-outline" to="/roommates">
                <UsersRound size={17} /> Meet roommates
              </Link>
            </div>
            <div className="hero-trust">
              <div className="avatar-stack">
                <img src="https://i.pravatar.cc/80?img=47" />
                <img src="https://i.pravatar.cc/80?img=12" />
                <img src="https://i.pravatar.cc/80?img=32" />
              </div>
              <span>
                <strong>1,200+</strong> people found their next home
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-image-main">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="Warm, sunlit living room"
              />
            </div>
            <div className="floating-note note-match">
              <span className="note-icon">
                <Heart size={17} fill="currentColor" />
              </span>
              <span>
                <strong>92% match</strong>
                <small>Good things start here</small>
              </span>
            </div>
            <div className="floating-note note-home">
              <span className="note-icon note-yellow">
                <KeyRound size={17} />
              </span>
              <span>
                <strong>Room for you</strong>
                <small>Cau Giay · Hanoi</small>
              </span>
            </div>
            <div className="hero-sticker">
              Your next
              <br />
              <strong>chapter ↗</strong>
            </div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>THOUGHTFULLY MATCHED</span>
          <span>ROOMS WITH CHARACTER</span>
          <span>REAL PEOPLE, REAL CONNECTIONS</span>
        </div>
      </section>
      <section className="container explore-section">
        <SectionHeading
          kicker="A PLACE TO BEGIN"
          title="What are you looking for?"
        />
        <div className="explore-grid">
          <Link to="/rooms" className="explore-card explore-rooms">
            <div className="explore-card-content">
              <span className="eyebrow">THE RIGHT SPACE</span>
              <h3>
                Find a room
                <br />
                that feels like home.
              </h3>
              <span className="circle-arrow">
                <ArrowRight size={19} />
              </span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85"
              alt="Thoughtful apartment interior"
            />
          </Link>
          <Link to="/roommates" className="explore-card explore-people">
            <div className="explore-card-content">
              <span className="eyebrow">THE RIGHT PEOPLE</span>
              <h3>
                Find your kind
                <br />
                of roommate.
              </h3>
              <span className="circle-arrow">
                <ArrowRight size={19} />
              </span>
            </div>
            <div className="people-visual">
              <img src="https://i.pravatar.cc/160?img=47" alt="" />
              <img src="https://i.pravatar.cc/160?img=12" alt="" />
              <div className="people-bubble">
                <UsersRound size={22} />
              </div>
            </div>
            <span className="floating-caption">
              Good chemistry
              <br />
              makes a home <Sparkles size={13} className="inline text-brand-gold" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>
      <section className="soft-section">
        <div className="container">
          <SectionHeading
            kicker="ROOMS WITH A LITTLE MORE SOUL"
            title="Your next place is out there."
            action="See all rooms"
            to="/rooms"
          />
          <div className="card-grid">
            {roomResults.map((r) => (
              <RoomCard room={r} key={r.id} />
            ))}
          </div>
        </div>
      </section>
      <section className="container people-section">
        <SectionHeading
          kicker="GOOD PEOPLE, GOOD ENERGY"
          title="Meet your next favorite person."
          action="Find your match"
          to="/roommates"
        />
        <div className="card-grid">
          {people.map((p) => (
            <ProfileCard profile={p} key={p.id} />
          ))}
        </div>
      </section>
      <section className="container closing-cta">
        <div>
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>
            Finding home should
            <br />
            feel a little more human.
          </h2>
          <p>Start with a room. Stay for the people.</p>
          <Link className="button button-light" to="/roommates">
            Find your people <ArrowRight size={17} />
          </Link>
        </div>
        <div className="cta-orbit">
          <div className="orbit-ring" />
          <span className="orbit-icon">
            <HomeIcon size={42} />
          </span>
          <span className="orbit-star">
            <Sparkles size={32} aria-hidden="true" />
          </span>
          <span className="orbit-dot" />
        </div>
      </section>
    </>
  );
}

function RoomsPage() {
  const { rooms, user } = useData();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All areas");
  const [price, setPrice] = useState("Any budget");
  const [sort, setSort] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const items = useMemo(
    () =>
      rooms
        .filter((r) => r.status === "published" && !r.hidden)
        .filter((r) =>
          `${r.title} ${r.area} ${r.address} ${r.description}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .filter((r) => area === "All areas" || r.area === area)
        .filter(
          (r) =>
            price === "Any budget" ||
            (price === "Under 2M"
              ? r.price < 2e6
              : price === "2–3M"
                ? r.price >= 2e6 && r.price < 3e6
                : price === "3–5M"
                  ? r.price >= 3e6 && r.price <= 5e6
                  : r.price > 5e6),
        )
        .sort((a, b) =>
          sort === "Price: low to high"
            ? a.price - b.price
            : sort === "Price: high to low"
              ? b.price - a.price
              : 0,
        ),
    [rooms, query, area, price, sort],
  );
  return (
    <div className="page container">
      <div className="page-intro">
        <div>
          <span className="eyebrow">ROOMS THAT FEEL LIKE HOME</span>
          <h1>
            Find your <em>place.</em>
          </h1>
          <p>Thoughtful spaces for wherever life takes you next.</p>
        </div>
        <button
          className="button button-primary"
          onClick={() =>
            user ? navigate("/rooms/new") : navigate("/login?next=/rooms/new")
          }
        >
          <Plus size={17} /> List a room
        </button>
      </div>
      <div className="search-panel">
        <label className="search-input">
          <Search size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by neighborhood, address, or keyword"
          />
        </label>
        <div
          className={`filter-controls ${showFilters ? "filters-visible" : ""}`}
        >
          <label>
            <span>Neighborhood</span>
            <select value={area} onChange={(e) => setArea(e.target.value)}>
              <option>All areas</option>
              {areaList.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Monthly budget</span>
            <select value={price} onChange={(e) => setPrice(e.target.value)}>
              {["Any budget", "Under 2M", "2–3M", "3–5M", "Over 5M"].map(
                (x) => (
                  <option key={x}>{x}</option>
                ),
              )}
            </select>
          </label>
          <button
            className="button button-filter"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>
      </div>
      <div className="results-top">
        <span>
          <strong>{items.length}</strong> thoughtfully picked spaces
        </span>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Recommended</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
          </select>
        </label>
      </div>
      {items.length ? (
        <div className="card-grid room-results">
          {items.map((room) => (
            <RoomCard room={room} key={room.id} />
          ))}
        </div>
      ) : (
        <Empty
          title="No rooms found just yet"
          body="Try a different neighborhood or clear your filters."
          action={() => {
            setQuery("");
            setArea("All areas");
            setPrice("Any budget");
          }}
        />
      )}
    </div>
  );
}
function Empty({ title, body, action, button = "Clear filters" }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Search size={23} />
      </span>
      <h3>{title}</h3>
      <p>{body}</p>
      {action && (
        <button className="button button-outline" onClick={action}>
          {button}
        </button>
      )}
    </div>
  );
}

function RoomDetail() {
  const { id } = useParams();
  const { rooms } = useData();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const room = rooms.find((r) => r.id === id);
  if (!room) return <NotFound />;
  return (
    <div className="container page detail-page">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back to rooms
      </button>
      <div className="detail-heading">
        <div>
          <span className="eyebrow">A PLACE TO MAKE YOUR OWN</span>
          <h1>{room.title}</h1>
          <p>
            <MapPin size={16} />
            {room.address}
          </p>
        </div>
        <strong className="detail-price">
          {money(room.price)}
          <small> / month</small>
        </strong>
      </div>
      <div className="gallery">
        <img
          className="gallery-main"
          src={room.images?.[0] || areaImages[0]}
          alt={room.title}
        />
        <div>
          {(room.images?.slice(1, 3) || areaImages.slice(1)).map((im, i) => (
            <img key={i} src={im} alt={`${room.title} view ${i + 2}`} loading="lazy" />
          ))}
        </div>
      </div>
      <div className="detail-columns">
        <article className="detail-main">
          <section>
            <h2>About this space</h2>
            <p>{room.description}</p>
          </section>
          <section>
            <h2>The details</h2>
            <div className="detail-facts">
              <span>
                <BedDouble />
                {room.size} m²
              </span>
              <span>
                <MapPin />
                {room.area}, Hanoi
              </span>
              <span>
                <ShieldCheck />
                Secure building
              </span>
            </div>
          </section>
          <section>
            <h2>What you'll love</h2>
            <div className="amenity-list">
              {room.amenities?.map((a) => (
                <span key={a}>
                  <Check size={15} />
                  {a}
                </span>
              ))}
            </div>
          </section>
        </article>
        <aside className="booking-card">
          <span className="eyebrow">MAKE IT YOURS</span>
          <h3>
            Come see it
            <br />
            for yourself.
          </h3>
          <p>
            Send a visit request and the host will get back to you to confirm a
            time.
          </p>
          <button
            className="button button-primary button-full"
            onClick={() => setModal(true)}
          >
            Request a viewing <ArrowRight size={16} />
          </button>
          <small>
            <ShieldCheck size={14} />
            No commitment — just a first look
          </small>
        </aside>
      </div>
      {modal && (
        <ViewingModal
          room={room}
          close={() => setModal(false)}
          sent={() => {
            setModal(false);
            setToast(true);
            setTimeout(() => setToast(false), 3500);
          }}
        />
      )}
      {toast && (
        <Toast message="Viewing request received. The host will contact you to confirm." />
      )}
    </div>
  );
}
function Modal({ title, children, close, wide = false }) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        className={`modal ${wide ? "modal-wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">TRONEST</span>
            <h2>{title}</h2>
          </div>
          <button className="icon-button" onClick={close} aria-label="Close">
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Field({ label, children, error, required, id }) {
  const errorId = id && error ? `${id}-error` : undefined;
  return (
    <div className="field">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <i aria-hidden="true"> *</i>}
        </label>
      )}
      {React.isValidElement(children) && id
        ? React.cloneElement(children, {
            id,
            "aria-invalid": !!error,
            "aria-describedby": errorId,
          })
        : children}
      {error && (
        <small id={errorId} className="field-error" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}
function ViewingModal({ room, close, sent }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    date: "",
    note: "",
  });
  const [err, setErr] = useState({});
  function submit(e) {
    e.preventDefault();
    const x = {};
    if (!form.name.trim()) x.name = "Please enter your name.";
    if (!form.contact.trim()) x.contact = "Add a phone number or email.";
    if (!form.date || new Date(form.date) < new Date())
      x.date = "Choose a future date and time.";
    setErr(x);
    if (!Object.keys(x).length) sent();
  }
  return (
    <Modal title="Request a viewing" close={close}>
      <p className="modal-copy">
        See if <strong>{room.title}</strong> feels like your next place. The
        host will contact you to confirm.
      </p>
      <form onSubmit={submit} className="form-stack">
        <Field label="Your name" required error={err.name} id="viewing-name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Alex Nguyen"
            autoComplete="name"
          />
        </Field>
        <Field label="Phone or email" required error={err.contact} id="viewing-contact">
          <input
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            placeholder="How can the host reach you?"
            autoComplete="tel email"
          />
        </Field>
        <Field label="Preferred date & time" required error={err.date} id="viewing-date">
          <input
            type="datetime-local"
            min={new Date(Date.now() + 3600000).toISOString().slice(0, 16)}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </Field>
        <Field label="A note for the host" id="viewing-note">
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Anything you'd like them to know?"
            rows="3"
          />
        </Field>
        <button className="button button-primary button-full">
          Send viewing request <ArrowRight size={16} aria-hidden="true" />
        </button>
      </form>
    </Modal>
  );
}
function Toast({ message }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      <span>
        <Check size={17} aria-hidden="true" />
      </span>
      {message}
    </div>
  );
}

function RoommatesPage() {
  const { profiles, connections, user } = useData();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All areas");
  const [type, setType] = useState("Any situation");
  const [budget, setBudget] = useState("Any budget");
  const [habit, setHabit] = useState("Any lifestyle");
  const [toast, setToast] = useState(false);
  const nav = useNavigate();
  const myId = user?.role === "user" ? "profile-me" : user?.profileId;
  const matched = new Set(
    connections
      .filter((c) => c.status === "accepted")
      .flatMap((c) => [c.fromProfileId, c.toProfileId]),
  );
  const items = profiles
    .filter((p) => p.id !== myId)
    .filter((p) =>
      `${p.displayName} ${p.area} ${p.intro}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .filter((p) => area === "All areas" || p.area === area)
    .filter(
      (p) =>
        type === "Any situation" ||
        (type === "Has a room"
          ? p.type === "has-room"
          : p.type === "need-room"),
    )
    .filter(
      (p) =>
        budget === "Any budget" ||
        (budget === "Under 2M"
          ? p.budget < 2e6
          : budget === "2–3M"
            ? p.budget >= 2e6 && p.budget < 3e6
            : p.budget >= 3e6),
    )
    .filter(
      (p) =>
        habit === "Any lifestyle" ||
        Object.values(p.habits || {}).some((v) =>
          String(v).toLowerCase().includes(habit.toLowerCase()),
        ),
    );
  return (
    <div className="page container">
      <div className="page-intro roommate-intro">
        <div>
          <span className="eyebrow">A LITTLE MORE THAN A ROOM</span>
          <h1>
            Find your <em>people.</em>
          </h1>
          <p>Shared spaces are better when the people in them just click.</p>
        </div>
        <button
          className="button button-primary"
          onClick={() =>
            user ? nav("/roommates/new") : nav("/login?next=/roommates/new")
          }
        >
          <Plus size={17} /> Create a profile
        </button>
      </div>
      <div className="roommate-banner">
        <div className="banner-symbol">
          <Sparkles />
        </div>
        <div>
          <strong>Good roommates start with good conversations.</strong>
          <span>
            Browse real people, see how your lifestyles line up, and start with
            a hello.
          </span>
        </div>
        <span className="banner-count">
          {profiles.length - 1}
          <small>people looking</small>
        </span>
      </div>
      <div className="search-panel">
        <label className="search-input">
          <Search size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search names, neighborhoods, or interests"
          />
        </label>
        <div className="filter-controls">
          <label>
            <span>Neighborhood</span>
            <select value={area} onChange={(e) => setArea(e.target.value)}>
              <option>All areas</option>
              {areaList.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Situation</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {["Any situation", "Has a room", "Looking for a room"].map(
                (a) => (
                  <option key={a}>{a}</option>
                ),
              )}
            </select>
          </label>
          <label>
            <span>Budget / person</span>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              {["Any budget", "Under 2M", "2–3M", "Over 3M"].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Lifestyle</span>
            <select value={habit} onChange={(e) => setHabit(e.target.value)}>
              {[
                "Any lifestyle",
                "no-smoking",
                "cat-friendly",
                "cooks-daily",
                "very-clean",
                "night-owl",
              ].map((a) => (
                <option key={a}>
                  {a === "Any lifestyle" ? a : a.replaceAll("-", " ")}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="results-top">
        <span>
          <strong>{items.length}</strong> people who could feel like home
        </span>
      </div>
      {items.length ? (
        <div className="card-grid profile-results">
          {items.map((p) => (
            <ProfileCard key={p.id} profile={p} matched={matched.has(p.id)} />
          ))}
        </div>
      ) : (
        <Empty
          title="No matches this time"
          body="Try broadening your search to meet more people."
          action={() => {
            setQuery("");
            setArea("All areas");
            setType("Any situation");
            setBudget("Any budget");
            setHabit("Any lifestyle");
          }}
        />
      )}
      {toast && <Toast message="Your connection request is on its way." />}
    </div>
  );
}

function NewRoom() {
  const { rooms, setRooms } = useData();
  const nav = useNavigate();
  const [toast, setToast] = useState(false);
  const [form, setForm] = useState({
    title: "",
    area: "Cau Giay",
    address: "",
    price: "",
    size: "",
    amenities: "Wi-Fi, Air Conditioning",
    description: "",
    image: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  function submit(e) {
    e.preventDefault();
    const er = {};
    ["title", "address", "price", "size", "description", "phone"].forEach(
      (k) => {
        if (!String(form[k]).trim()) er[k] = "This field is required.";
      },
    );
    if (+form.price <= 0) er.price = "Enter a valid monthly price.";
    if (+form.size <= 0) er.size = "Enter a valid room size.";
    if (!/^0\d{9}$/.test(form.phone))
      er.phone = "Enter a valid 10-digit Vietnamese phone number.";
    setErrors(er);
    if (Object.keys(er).length) return;
    const room = {
      id: `room-${Date.now()}`,
      title: form.title,
      area: form.area,
      address: form.address,
      price: +form.price,
      size: +form.size,
      amenities: form.amenities
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      description: form.description,
      images: [form.image || areaImages[0]],
      contactPhone: form.phone,
      status: "pending",
      hidden: false,
      createdAt: new Date().toISOString(),
    };
    setRooms([room, ...rooms]);
    setToast(true);
    setTimeout(() => nav("/rooms"), 2200);
  }
  return (
    <div className="container page form-page">
      <button className="back-link" onClick={() => nav("/rooms")}>
        <ArrowLeft size={16} /> Back to rooms
      </button>
      <div className="form-page-head">
        <span className="eyebrow">SHARE A SPACE</span>
        <h1>
          List your <em>room.</em>
        </h1>
        <p>Tell us about the space. We'll review it before it goes live.</p>
      </div>
      <form className="listing-form" onSubmit={submit}>
        <div className="form-grid">
          <Field label="Listing title" required error={errors.title} id="room-title">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Bright studio near the university"
            />
          </Field>
          <Field label="Neighborhood" required id="room-area">
            <select
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            >
              {areaList.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </Field>
          <Field label="Street address" required error={errors.address} id="room-address">
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Street, ward, district"
              autoComplete="street-address"
            />
          </Field>
          <Field label="Monthly rent (VND)" required error={errors.price} id="room-price">
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. 3500000"
            />
          </Field>
          <Field label="Room size (m²)" required error={errors.size} id="room-size">
            <input
              type="number"
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              placeholder="e.g. 24"
            />
          </Field>
          <Field label="Contact phone" required error={errors.phone} id="room-phone">
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="0912345678"
            />
          </Field>
          <Field label="Amenities (comma separated)" id="room-amenities">
            <input
              value={form.amenities}
              onChange={(e) => setForm({ ...form, amenities: e.target.value })}
            />
          </Field>
          <Field label="Photo URL" id="room-image">
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Optional — we'll add a sample image"
            />
          </Field>
          <div className="full-field">
            <Field label="Description" required error={errors.description} id="room-desc">
              <textarea
                rows="5"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="What makes this room special?"
              />
            </Field>
          </div>
        </div>
        <div className="form-submit">
          <span>
            <ShieldCheck size={16} /> New listings are reviewed before appearing
            publicly.
          </span>
          <button className="button button-primary">
            Submit for review <ArrowRight size={16} />
          </button>
        </div>
      </form>
      {toast && (
        <Toast message="Listing submitted! It is now waiting for admin review." />
      )}
    </div>
  );
}

function NewProfile() {
  const { profiles, setProfiles, connections, setConnections, user, setUser } =
    useData();
  const nav = useNavigate();
  const [type, setType] = useState("need-room");
  const [form, setForm] = useState({
    name: "",
    area: "Cau Giay",
    budget: "",
    moveInDate: "",
    phone: "",
    intro: "",
    sleep: "early",
    smoking: "no-smoking",
    pets: "no-pets",
    cooking: "occasional",
    cleanliness: "very-clean",
    guests: "rarely",
    roomRent: "",
    costPerPerson: "",
    slotsLeft: "1",
    size: "",
    amenities: "Wi-Fi, Air Conditioning",
    roomInfo: "",
  });
  const [errors, setErrors] = useState({});
  function submit(e) {
    e.preventDefault();
    const er = {};
    ["name", "budget", "moveInDate", "phone", "intro"].forEach((k) => {
      if (!String(form[k]).trim()) er[k] = "This field is required.";
    });
    if (!/^0\d{9}$/.test(form.phone))
      er.phone = "Enter a valid 10-digit Vietnamese phone number.";
    if (
      type === "has-room" &&
      (!form.roomRent || !form.costPerPerson || !form.roomInfo)
    )
      er.roomInfo = "Complete your room details and rent information.";
    setErrors(er);
    if (Object.keys(er).length) return;
    const p = {
      id: `profile-${Date.now()}`,
      ownerId: user?.id || "user-demo",
      displayName: form.name,
      avatar: `https://i.pravatar.cc/180?u=${encodeURIComponent(form.name)}`,
      type,
      area: form.area,
      budget: +form.budget,
      moveInDate: form.moveInDate,
      habits: {
        sleep: form.sleep,
        smoking: form.smoking,
        pets: form.pets,
        cooking: form.cooking,
        cleanliness: form.cleanliness,
        guests: form.guests,
      },
      phone: form.phone,
      intro: form.intro,
      ...(type === "has-room"
        ? {
            roomRent: +form.roomRent,
            costPerPerson: +form.costPerPerson,
            slotsLeft: +form.slotsLeft,
            roomInfo: {
              size: +form.size,
              amenities: form.amenities.split(",").map((s) => s.trim()),
              description: form.roomInfo,
            },
          }
        : {}),
    };
    setProfiles([p, ...profiles]);
    setConnections([
      {
        id: `conn-demo-${Date.now()}`,
        fromProfileId: "profile-3",
        toProfileId: p.id,
        message: `Hi ${form.name}! Your home preferences sound thoughtful. Would you like to connect?`,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      ...connections,
    ]);
    if (user) setUser({ ...user, profileId: p.id });
    nav(`/roommates/${p.id}`);
  }
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="container page form-page">
      <button className="back-link" onClick={() => nav("/roommates")}>
        <ArrowLeft size={16} /> Back to roommates
      </button>
      <div className="form-page-head">
        <span className="eyebrow">LET'S FIND YOUR PEOPLE</span>
        <h1>
          Create your <em>profile.</em>
        </h1>
        <p>A little about you helps the right person find you.</p>
      </div>
      <form className="listing-form" onSubmit={submit}>
        <h3>What's your situation?</h3>
        <div className="choice-grid">
          <button
            type="button"
            className={`choice-card ${type === "need-room" ? "selected" : ""}`}
            onClick={() => setType("need-room")}
          >
            <span className="choice-icon">
              <Search />
            </span>
            <strong>Looking for a room</strong>
            <small>Find a space and someone to share it with.</small>
          </button>
          <button
            type="button"
            className={`choice-card ${type === "has-room" ? "selected" : ""}`}
            onClick={() => setType("has-room")}
          >
            <span className="choice-icon">
              <HomeIcon />
            </span>
            <strong>I have a room</strong>
            <small>Find a lovely person to share your space.</small>
          </button>
        </div>
        <div className="form-grid">
          <Field label="Name or nickname" required error={errors.name} id="profile-name">
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="What should people call you?"
              autoComplete="name"
            />
          </Field>
          <Field label="Neighborhood" required id="profile-area">
            <select
              value={form.area}
              onChange={(e) => set("area", e.target.value)}
            >
              {areaList.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </Field>
          <Field
            label="Monthly budget per person (VND)"
            required
            error={errors.budget}
            id="profile-budget"
          >
            <input
              type="number"
              value={form.budget}
              onChange={(e) => set("budget", e.target.value)}
              placeholder="e.g. 2500000"
            />
          </Field>
          <Field label="Target move-in date" required error={errors.moveInDate} id="profile-movein">
            <input
              type="date"
              value={form.moveInDate}
              onChange={(e) => set("moveInDate", e.target.value)}
            />
          </Field>
          {type === "has-room" && (
            <>
              <Field label="Total monthly rent (VND)" required id="profile-roomrent">
                <input
                  type="number"
                  value={form.roomRent}
                  onChange={(e) => set("roomRent", e.target.value)}
                  placeholder="e.g. 5000000"
                />
              </Field>
              <Field label="Your share per person (VND)" required id="profile-costperson">
                <input
                  type="number"
                  value={form.costPerPerson}
                  onChange={(e) => set("costPerPerson", e.target.value)}
                  placeholder="e.g. 2500000"
                />
              </Field>
              <Field label="Open spots" id="profile-slots">
                <input
                  type="number"
                  min="1"
                  value={form.slotsLeft}
                  onChange={(e) => set("slotsLeft", e.target.value)}
                />
              </Field>
              <Field label="Room size (m²)" id="profile-size">
                <input
                  type="number"
                  value={form.size}
                  onChange={(e) => set("size", e.target.value)}
                  placeholder="e.g. 30"
                />
              </Field>
              <Field label="Amenities" id="profile-amenities">
                <input
                  value={form.amenities}
                  onChange={(e) => set("amenities", e.target.value)}
                />
              </Field>
              <div className="full-field">
                <Field label="About the room" required error={errors.roomInfo} id="profile-roominfo">
                  <textarea
                    rows="3"
                    value={form.roomInfo}
                    onChange={(e) => set("roomInfo", e.target.value)}
                    placeholder="Describe the room and living arrangement"
                  />
                </Field>
              </div>
            </>
          )}
          {Object.entries(habitNames).map(([k, label]) => (
            <Field key={k} label={label} id={`profile-habit-${k}`}>
              <select value={form[k]} onChange={(e) => set(k, e.target.value)}>
                {habitOptions(k).map((o) => (
                  <option key={o} value={o}>
                    {o.replaceAll("-", " ")}
                  </option>
                ))}
              </select>
            </Field>
          ))}
          <Field label="Contact phone" required error={errors.phone} id="profile-phone">
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="0912345678"
            />
          </Field>
          <div className="full-field">
            <Field label="A little about you" required error={errors.intro} id="profile-intro">
              <textarea
                rows="4"
                value={form.intro}
                onChange={(e) => set("intro", e.target.value)}
                placeholder="What do you enjoy? What kind of home are you hoping for?"
              />
            </Field>
          </div>
        </div>
        <div className="form-submit">
          <span>
            <ShieldCheck size={16} aria-hidden="true" /> Your details stay on this demo device.
          </span>
          <button className="button button-primary">
            Publish my profile <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
function habitOptions(key) {
  return (
    {
      sleep: ["early", "night-owl", "flexible"],
      smoking: ["no-smoking", "smoker", "occasionally"],
      pets: ["no-pets", "cat-friendly", "dog-friendly", "has-pets"],
      cooking: ["cooks-daily", "occasional", "rarely"],
      cleanliness: ["very-clean", "tidy", "relaxed"],
      guests: ["rarely", "sometimes", "often"],
    }[key] || []
  );
}

function ProfileDetail() {
  const { id } = useParams();
  const { profiles, connections, setConnections, user } = useData();
  const nav = useNavigate();
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const p = profiles.find((x) => x.id === id);
  if (!p) return <NotFound />;
  const mine =
    profiles.find((x) => x.id === user?.profileId) ||
    profiles.find((x) => x.id === "profile-me") ||
    profiles.find((x) => x.ownerId === user?.id);
  const relation = connections.find(
    (c) =>
      (c.fromProfileId === mine?.id && c.toProfileId === p.id) ||
      (c.toProfileId === mine?.id && c.fromProfileId === p.id),
  );
  const compat = mine ? calculateCompatibility(mine, p) : null;
  const criteria = [
    ...(compat?.matches || []).map((c) => ({ label: c.label, match: true })),
    ...(compat?.mismatches || []).map((c) => ({
      label: c.label,
      match: false,
    })),
  ];
  const handle = () => {
    if (!user) {
      nav("/login");
      return;
    }
    if (relation?.status === "accepted") {
      nav(`/chat/${relation.id}`);
      return;
    }
    if (relation?.status === "pending") return;
    setModal(true);
  };
  return (
    <div className="container page detail-page">
      <button className="back-link" onClick={() => nav("/roommates")}>
        <ArrowLeft size={16} /> Back to people
      </button>
      <div className="profile-detail-card">
        <div className="profile-detail-head">
          <img className="avatar avatar-xl" src={p.avatar} alt="" />
          <div>
            <span className="eyebrow">
              {p.type === "has-room" ? "HAS A ROOM" : "LOOKING FOR A ROOM"}
            </span>
            <h1>{p.displayName}</h1>
            <p>
              <MapPin size={16} />
              {p.area}, Hanoi <span>·</span> Moving{" "}
              {new Date(p.moveInDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button
            className={`button ${relation?.status === "accepted" ? "button-outline" : "button-primary"}`}
            onClick={handle}
          >
            {relation?.status === "accepted" ? (
              <>
                <MessageCircle size={17} /> Message
              </>
            ) : relation?.status === "pending" ? (
              <>
                <Clock3 size={17} /> Awaiting response
              </>
            ) : relation?.status === "rejected" ? (
              <>
                <X size={17} /> Request declined
              </>
            ) : (
              <>
                Say hello <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
        <div className="profile-detail-body">
          <article>
            <section>
              <h2>A little about {p.displayName.split(" ")[0]}</h2>
              <p>{p.intro}</p>
            </section>
            <section>
              <h2>Looking for</h2>
              <div className="detail-facts">
                <span>
                  <MapPin />
                  {p.area}
                </span>
                <span>
                  <KeyRound />
                  Up to {money(p.budget)} / person
                </span>
                <span>
                  <Clock3 />
                  Move-in{" "}
                  {new Date(p.moveInDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </section>
            {p.type === "has-room" && (
              <section>
                <h2>The room</h2>
                <p>{p.roomInfo?.description}</p>
                <div className="amenity-list">
                  {p.roomInfo?.amenities?.map((a) => (
                    <span key={a}>
                      <Check size={15} />
                      {a}
                    </span>
                  ))}
                </div>
              </section>
            )}
            <section>
              <h2>Life at home</h2>
              <div className="habit-grid">
                {Object.entries(p.habits || {}).map(([k, v]) => (
                  <div key={k}>
                    <small>{habitNames[k]}</small>
                    <strong>{String(v).replaceAll("-", " ")}</strong>
                  </div>
                ))}
              </div>
            </section>
          </article>
          <aside className="compat-card">
            <span className="eyebrow">THE ROOMMATE CHEMISTRY</span>
            {mine ? (
              <>
                <div className="compat-score">
                  {compat?.score || 0}
                  <small>%</small>
                </div>
                <h3>
                  {(compat?.score || 0) >= 80
                    ? "You might just click."
                    : (compat?.score || 0) >= 60
                      ? "Looking promising."
                      : "A good place to start."}
                </h3>
                <p>
                  Based on your areas, budgets, timing, and day-to-day habits.
                </p>
                <div className="compat-factors">
                  {criteria.slice(0, 6).map((c, i) => (
                    <span
                      key={i}
                      className={c.match ? "factor-good" : "factor-miss"}
                    >
                      {c.match ? <Check size={14} /> : <X size={14} />}{" "}
                      {c.label}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="compat-placeholder">
                  <Sparkles />
                </div>
                <h3>Your match story starts here.</h3>
                <p>
                  Create your own profile to see how your lifestyles line up.
                </p>
                <Link
                  className="button button-primary button-full"
                  to="/roommates/new"
                >
                  Create my profile
                </Link>
              </>
            )}
          </aside>
        </div>
      </div>
      {modal && (
        <ConnectionModal
          profile={p}
          close={() => setModal(false)}
          send={(message) => {
            const c = {
              id: `conn-${Date.now()}`,
              fromProfileId: mine?.id || "profile-me",
              toProfileId: p.id,
              message,
              status: "pending",
              createdAt: new Date().toISOString(),
            };
            setConnections([c, ...connections]);
            setModal(false);
            setToast(true);
            setTimeout(() => setToast(false), 3200);
          }}
        />
      )}
      {toast && (
        <Toast message="Connection request sent. Chat unlocks if they accept." />
      )}
    </div>
  );
}
function ConnectionModal({ profile, close, send }) {
  const [message, setMessage] = useState("");
  return (
    <Modal
      title={`Say hello to ${profile.displayName.split(" ")[0]}`}
      close={close}
    >
      <p className="modal-copy">
        A thoughtful first note makes all the difference. Keep it warm and under
        240 characters.
      </p>
      <form
        className="form-stack"
        onSubmit={(e) => {
          e.preventDefault();
          if (message.trim()) send(message.trim());
        }}
      >
        <Field label="Your opening message" required>
          <textarea
            rows="5"
            maxLength={240}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi! I noticed we both love a peaceful home..."
          />
        </Field>
        <small className="char-count">{message.length}/240</small>
        <button
          className="button button-primary button-full"
          disabled={!message.trim()}
        >
          Send connection request <Send size={16} />
        </button>
      </form>
    </Modal>
  );
}

function ConnectionsPage() {
  const { connections, setConnections, profiles, user } = useData();
  const [tab, setTab] = useState("received");
  const me =
    profiles.find((p) => p.id === "profile-me") ||
    profiles.find((p) => p.ownerId === user?.id) ||
    profiles[0];
  const shown = connections.filter((c) =>
    tab === "received" ? c.toProfileId === me?.id : c.fromProfileId === me?.id,
  );
  function respond(c, status) {
    setConnections(
      connections.map((x) => (x.id === c.id ? { ...x, status } : x)),
    );
  }
  return (
    <div className="container page">
      <div className="page-intro">
        <div>
          <span className="eyebrow">YOUR PEOPLE, IN ONE PLACE</span>
          <h1>Connections.</h1>
          <p>Every great share-house starts with a hello.</p>
        </div>
      </div>
      <div className="tabs">
        <button
          className={tab === "received" ? "active" : ""}
          onClick={() => setTab("received")}
        >
          Requests received{" "}
          <span>
            {
              connections.filter(
                (c) => c.toProfileId === me?.id && c.status === "pending",
              ).length
            }
          </span>
        </button>
        <button
          className={tab === "sent" ? "active" : ""}
          onClick={() => setTab("sent")}
        >
          Requests sent
        </button>
      </div>
      <div className="connection-list">
        {shown.length ? (
          shown.map((c) => {
            const other = profiles.find(
              (p) =>
                p.id ===
                (c.fromProfileId === me?.id ? c.toProfileId : c.fromProfileId),
            );
            return (
              <div className="connection-card" key={c.id}>
                <img
                  className="avatar avatar-large"
                  src={other?.avatar}
                  alt=""
                />
                <div className="connection-info">
                  <h3>
                    {other?.displayName || "TroNest member"}{" "}
                    <span className={`status-pill status-${c.status}`}>
                      {c.status}
                    </span>
                  </h3>
                  <p>{c.message}</p>
                  <small>
                    <MapPin size={13} />
                    {other?.area} · {new Date(c.createdAt).toLocaleDateString()}
                  </small>
                </div>
                {tab === "received" && c.status === "pending" ? (
                  <div className="connection-actions">
                    <button
                      className="button button-outline"
                      onClick={() => respond(c, "rejected")}
                    >
                      Pass
                    </button>
                    <button
                      className="button button-primary"
                      onClick={() => respond(c, "accepted")}
                    >
                      <Check size={15} /> Accept
                    </button>
                  </div>
                ) : c.status === "pending" ? (
                  <button
                    className="button button-outline"
                    onClick={() =>
                      respond(c, Math.random() > 0.5 ? "accepted" : "rejected")
                    }
                  >
                    Simulate response
                  </button>
                ) : c.status === "accepted" ? (
                  <Link className="button button-primary" to={`/chat/${c.id}`}>
                    <MessageCircle size={16} /> Message
                  </Link>
                ) : null}
              </div>
            );
          })
        ) : (
          <Empty
            title="No connection requests yet"
            body="When someone reaches out, you'll find them here."
          />
        )}
      </div>
    </div>
  );
}
function ChatPage() {
  const { id } = useParams();
  const { connections, profiles, messages, setMessages, user } = useData();
  const c = connections.find((x) => x.id === id && x.status === "accepted");
  const nav = useNavigate();
  const [text, setText] = useState("");
  if (!c)
    return (
      <div className="container page">
        <Empty
          title="This chat is not available"
          body="A conversation opens after a connection is accepted."
          action={() => nav("/connections")}
          button="Go to connections"
        />
      </div>
    );
  const me =
    profiles.find((p) => p.id === "profile-me") ||
    profiles.find((p) => p.ownerId === user?.id);
  const otherId = c.fromProfileId === me?.id ? c.toProfileId : c.fromProfileId;
  const other = profiles.find((p) => p.id === otherId);
  const thread = messages.filter((m) => m.connectionId === id);
  function send(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      connectionId: id,
      senderProfileId: me?.id || "profile-me",
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, msg]);
    setText("");
  }
  return (
    <div className="container page chat-page">
      <button className="back-link" onClick={() => nav("/connections")}>
        <ArrowLeft size={16} /> All connections
      </button>
      <div className="chat-window">
        <div className="chat-head">
          <img className="avatar avatar-small" src={other?.avatar} alt="" />
          <div>
            <strong>{other?.displayName}</strong>
            <small>
              <span className="online-dot" /> Connected on TroNest
            </small>
          </div>
          <button className="icon-button" aria-label="More options">
            <ChevronDown size={19} />
          </button>
        </div>
        <div className="chat-context">
          <span className="eyebrow">A NEW CONNECTION</span>
          <p>
            You and {other?.displayName} are connected. Get to know each other
            and see where it goes.
          </p>
        </div>
        <div className="message-list">
          {thread.length ? (
            thread.map((m) => (
              <div
                className={`message-row ${m.senderProfileId === me?.id ? "message-mine" : ""}`}
                key={m.id}
              >
                <div className="message-bubble">
                  {m.text}
                  <small>
                    {new Date(m.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <p className="chat-empty">Say hello to start your conversation.</p>
          )}
        </div>
        <form className="chat-compose" onSubmit={send}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a thoughtful hello…"
          />
          <button aria-label="Send message" disabled={!text.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

function Login() {
  const { setUser } = useData();
  const nav = useNavigate();
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next") || "/";
  const [email, setEmail] = useState("user@tronest.demo");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  function submit(e) {
    e.preventDefault();
    if (email === "user@tronest.demo" && password === "123456") {
      setUser({
        id: "user-demo",
        name: "Alex Nguyen",
        email,
        role: "user",
        profileId: "profile-me",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      });
      nav(next);
    } else if (email === "admin@tronest.demo" && password === "admin123") {
      setUser({
        id: "admin-demo",
        name: "Jamie",
        email,
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      });
      nav("/admin");
    } else setError("That email and password do not match our demo accounts.");
  }
  return (
    <div className="login-page">
      <div className="login-art">
        <div className="login-art-copy">
          <Logo light />
          <span className="eyebrow">A HOME FOR NEW BEGINNINGS</span>
          <h2>
            More than a room.
            <br />A place to <em>belong.</em>
          </h2>
          <p>Find your space, meet your people, and start the next chapter.</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
          alt="Comfortable sunlit home"
        />
      </div>
      <div className="login-form-wrap">
        <Link className="back-link" to="/">
          <ArrowLeft size={16} /> Back home
        </Link>
        <div className="login-form-inner">
          <span className="eyebrow">WELCOME TO TRONEST</span>
          <h1>
            Come on <em>in.</em>
          </h1>
          <p>Sign in to keep finding your place.</p>
          <form className="form-stack" onSubmit={submit}>
            <Field label="Email address" id="login-email">
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password" id="login-password">
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            {error && <p className="login-error" role="alert">{error}</p>}
            <button className="button button-primary button-full">
              Sign in <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
          <div className="demo-accounts">
            <strong>Quick Demo Sign In</strong>
            <button
              type="button"
              className="demo-account-btn"
              onClick={() => {
                setEmail("user@tronest.demo");
                setPassword("123456");
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Alex Nguyen"
                className="avatar avatar-small"
              />
              <div className="demo-account-info">
                <span className="demo-account-name">
                  Alex Nguyen <span className="demo-badge">User</span>
                </span>
                <span className="demo-account-cred">user@tronest.demo / 123456</span>
              </div>
            </button>
            <button
              type="button"
              className="demo-account-btn"
              onClick={() => {
                setEmail("admin@tronest.demo");
                setPassword("admin123");
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                alt="Jamie Admin"
                className="avatar avatar-small"
              />
              <div className="demo-account-info">
                <span className="demo-account-name">
                  Jamie <span className="demo-badge demo-badge-admin">Admin</span>
                </span>
                <span className="demo-account-cred">admin@tronest.demo / admin123</span>
              </div>
            </button>
          </div>
        </div>
        <div className="login-foot">
          A thoughtful place to land <Sparkles size={13} className="inline text-brand-gold" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function AdminPage() {
  const { rooms, setRooms, user } = useData();
  const nav = useNavigate();
  const [tab, setTab] = useState("pending");
  useEffect(() => {
    if (user?.role !== "admin") nav("/login?next=/admin", { replace: true });
  }, [user, nav]);
  const filtered = rooms.filter((r) =>
    tab === "hidden"
      ? r.hidden
      : tab === "published"
        ? r.status === "published" && !r.hidden
        : r.status === tab,
  );
  function update(id, patch) {
    setRooms(rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  if (user?.role !== "admin") return null;
  return (
    <div className="container page">
      <div className="page-intro">
        <div>
          <span className="eyebrow">KEEPING OUR COMMUNITY THOUGHTFUL</span>
          <h1>
            Admin <em>studio.</em>
          </h1>
          <p>Review new spaces and keep the room board up to date.</p>
        </div>
      </div>
      <div className="admin-stats">
        <div>
          <span>Pending review</span>
          <strong>{rooms.filter((r) => r.status === "pending").length}</strong>
        </div>
        <div>
          <span>Published spaces</span>
          <strong>
            {rooms.filter((r) => r.status === "published" && !r.hidden).length}
          </strong>
        </div>
        <div>
          <span>Hidden listings</span>
          <strong>{rooms.filter((r) => r.hidden).length}</strong>
        </div>
      </div>
      <div className="tabs admin-tabs">
        {[
          ["pending", "Pending review"],
          ["published", "Published"],
          ["hidden", "Hidden"],
          ["rejected", "Declined"],
        ].map(([k, v]) => (
          <button
            className={tab === k ? "active" : ""}
            onClick={() => setTab(k)}
            key={k}
          >
            {v}
            <span>
              {
                rooms.filter((r) =>
                  k === "hidden"
                    ? r.hidden
                    : k === "published"
                      ? r.status === "published" && !r.hidden
                      : r.status === k,
                ).length
              }
            </span>
          </button>
        ))}
      </div>
      <div className="admin-list">
        {filtered.length ? (
          filtered.map((r) => (
            <div className="admin-card" key={r.id}>
              <img src={r.images?.[0]} alt={r.title} loading="lazy" />
              <div className="admin-card-info">
                <span className="eyebrow">
                  {r.area} · {money(r.price)}/mo
                </span>
                <h3>{r.title}</h3>
                <p>{r.address}</p>
                <span className={`status-pill status-${r.status}`}>
                  {r.hidden ? "hidden" : r.status}
                </span>
              </div>
              <div className="admin-card-actions">
                {r.status === "pending" && (
                  <>
                    <button
                      className="button button-outline"
                      onClick={() => update(r.id, { status: "rejected" })}
                    >
                      Decline
                    </button>
                    <button
                      className="button button-primary"
                      onClick={() => update(r.id, { status: "published" })}
                    >
                      <Check size={15} /> Approve
                    </button>
                  </>
                )}
                {r.status === "published" && !r.hidden && (
                  <button
                    className="button button-outline"
                    onClick={() => update(r.id, { hidden: true })}
                  >
                    Hide listing
                  </button>
                )}
                {r.hidden && (
                  <button
                    className="button button-primary"
                    onClick={() => update(r.id, { hidden: false })}
                  >
                    Restore listing
                  </button>
                )}
                {r.status === "rejected" && (
                  <button
                    className="button button-outline"
                    onClick={() => update(r.id, { status: "pending" })}
                  >
                    Reopen review
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <Empty
            title="Nothing to review here"
            body="New room listings will show up in this tab."
          />
        )}
      </div>
    </div>
  );
}
function NotFound() {
  return (
    <div className="container page">
      <Empty
        title="We couldn't find that page"
        body="Let's get you back to a place that feels right."
        action={() => window.location.assign("/")}
        button="Back to TroNest"
      />
    </div>
  );
}
function App() {
  return (
    <DataProvider>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/roommates" element={<RoommatesPage />} />
          <Route path="/roommates/new" element={<NewProfile />} />
          <Route path="/roommates/:id" element={<ProfileDetail />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
    </DataProvider>
  );
}

export default App;
