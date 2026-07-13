"use client";

import { useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Globe,
  Info,
  Laptop,
  Mail,
  MoreVertical,
  Smartphone,
  UploadCloud,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const tabs = [
  "Profile",
  "General",
  "Role management",
  "Team",
  "Notifications",
  "Billings",
  "Security",
] as const;

const fieldInput =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary";

function FormRow({
  label,
  hint,
  info,
  children,
}: {
  label: string;
  hint?: string;
  info?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[240px_1fr] gap-8 border-b border-gray-100 py-5">
      <div>
        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
          {label}
          {info && <Info size={13} className="text-gray-400" />}
        </div>
        {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
      </div>
      <div className="max-w-lg">{children}</div>
    </div>
  );
}

function UploadDropzone({
  onSelect,
  inputId,
}: {
  onSelect: (url: string) => void;
  inputId: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="flex w-full flex-col items-center rounded-xl border border-dashed border-gray-300 px-4 py-5 hover:border-gray-400"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm">
          <UploadCloud size={16} />
        </span>
        <span className="mt-2 text-xs">
          <span className="font-semibold text-primary">Upload photo</span>{" "}
          <span className="text-gray-600">or drag and drop</span>
        </span>
        <span className="mt-0.5 text-xs text-gray-400">
          PNG, JPG or GIF (optional)
        </span>
      </button>
      <input
        ref={ref}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/gif"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onSelect(URL.createObjectURL(e.target.files[0]));
          }
          e.target.value = "";
        }}
      />
    </>
  );
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center justify-end gap-3 pt-5">
      {saved && (
        <span className="flex items-center gap-1 text-sm text-green-600">
          <Check size={14} /> Saved
        </span>
      )}
      <button
        type="button"
        onClick={onSave}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Save changes
      </button>
    </div>
  );
}

/* --------------------------------- Profile -------------------------------- */

function ProfileTab() {
  const [firstName, setFirstName] = useState("James");
  const [lastName, setLastName] = useState("Akintaro");
  const [email, setEmail] = useState("jakintaro@gclout.com");
  const [photo, setPhoto] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">Personal info</h2>
      <p className="mt-0.5 text-sm text-gray-500">
        Update your photo and personal details here.
      </p>

      <div className="mt-4">
        <FormRow label="Name">
          <div className="grid grid-cols-2 gap-4">
            <input
              aria-label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={fieldInput}
            />
            <input
              aria-label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={fieldInput}
            />
          </div>
        </FormRow>

        <FormRow label="Email address">
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              aria-label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(fieldInput, "pl-9")}
            />
          </div>
        </FormRow>

        <FormRow
          label="Your photo"
          hint="This will be displayed on your profile."
        >
          <div className="flex items-start gap-4">
            {photo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={photo}
                alt="Profile"
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-primary">
                {firstName[0] ?? "J"}
                {lastName[0] ?? "A"}
              </span>
            )}
            <div className="flex-1">
              <UploadDropzone inputId="profile-photo" onSelect={setPhoto} />
            </div>
          </div>
        </FormRow>

        <FormRow label="Role">
          <input
            aria-label="Role"
            value="Super admin"
            disabled
            className={cn(fieldInput, "bg-gray-50 text-gray-500")}
          />
        </FormRow>

        <SaveBar
          saved={saved}
          onSave={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
          }}
        />
      </div>
    </div>
  );
}

/* --------------------------------- General -------------------------------- */

const socialPrefixes = [
  { prefix: "http://", value: "www.gclout.com" },
  { prefix: "x.com/", value: "gclout" },
  { prefix: "facebook.com/", value: "gclout" },
  { prefix: "linkedin.com/company/", value: "gclout" },
];

function GeneralTab() {
  const [platformName, setPlatformName] = useState("Governance Clout");
  const [language, setLanguage] = useState("English (UK)");
  const [logo, setLogo] = useState<string | null>(null);
  const [country, setCountry] = useState("Nigeria");
  const [timezone, setTimezone] = useState("Pacific Standard Time (PST) UTC-08:00");
  const [brandReports, setBrandReports] = useState(false);
  const [brandEmails, setBrandEmails] = useState(true);
  const [socials, setSocials] = useState(socialPrefixes.map((s) => s.value));
  const [saved, setSaved] = useState(false);

  const selectWrap = "relative";
  const selectInput = cn(fieldInput, "appearance-none pl-9 pr-9");

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">General settings</h2>
      <p className="mt-0.5 text-sm text-gray-500">
        Update essential information related to Gclout
      </p>

      <div className="mt-4">
        <FormRow label="Platform name">
          <input
            aria-label="Platform name"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className={fieldInput}
          />
        </FormRow>

        <FormRow label="Default language">
          <div className={selectWrap}>
            <Globe
              size={14}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
            />
            <select
              aria-label="Default language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={selectInput}
            >
              <option>English (UK)</option>
              <option>English (US)</option>
              <option>Français</option>
              <option>Hausa</option>
              <option>Yoruba</option>
              <option>Igbo</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </FormRow>

        <FormRow
          label="Company logo"
          info
          hint="Update your company logo and then choose where you want it to display"
        >
          <div className="flex items-start gap-4">
            {logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={logo}
                alt="Company logo"
                className="h-12 w-12 rounded-xl object-cover"
              />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                <Logo className="text-white text-lg" />
              </span>
            )}
            <div className="flex-1">
              <UploadDropzone inputId="company-logo" onSelect={setLogo} />
            </div>
          </div>
        </FormRow>

        <FormRow label="Country">
          <div className={selectWrap}>
            <span className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm" aria-hidden>
              🇳🇬
            </span>
            <select
              aria-label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={selectInput}
            >
              <option>Nigeria</option>
              <option>Ghana</option>
              <option>Kenya</option>
              <option>South Africa</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </FormRow>

        <FormRow label="Timezone" info>
          <div className={selectWrap}>
            <Globe
              size={14}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400"
            />
            <select
              aria-label="Timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={selectInput}
            >
              <option>Pacific Standard Time (PST) UTC-08:00</option>
              <option>West Africa Time (WAT) UTC+01:00</option>
              <option>Greenwich Mean Time (GMT) UTC+00:00</option>
              <option>Eastern Time (ET) UTC-05:00</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </FormRow>

        <FormRow label="Branding" hint="Add your logo to reports and emails.">
          <div className="space-y-3">
            <label className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={brandReports}
                onChange={(e) => setBrandReports(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>
                <span className="block text-sm font-medium text-gray-800">
                  Reports
                </span>
                <span className="block text-sm text-gray-500">
                  Include my logo in summary reports.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={brandEmails}
                onChange={(e) => setBrandEmails(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>
                <span className="block text-sm font-medium text-gray-800">
                  Emails
                </span>
                <span className="block text-sm text-gray-500">
                  Include my logo in customer emails.
                </span>
              </span>
            </label>
          </div>
        </FormRow>

        <FormRow label="Social profiles">
          <div className="space-y-3">
            {socialPrefixes.map((s, i) => (
              <div
                key={s.prefix}
                className="flex overflow-hidden rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-primary"
              >
                <span className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
                  {s.prefix}
                </span>
                <input
                  aria-label={`${s.prefix} handle`}
                  value={socials[i]}
                  onChange={(e) =>
                    setSocials((prev) =>
                      prev.map((v, j) => (j === i ? e.target.value : v))
                    )
                  }
                  className="w-full px-3 py-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </FormRow>

        <SaveBar
          saved={saved}
          onSave={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
          }}
        />
      </div>
    </div>
  );
}

/* ----------------------------- Role management ----------------------------- */

interface Role {
  name: string;
  viewUsers: boolean;
  editUsers: boolean;
  moderateContent: boolean;
}

const initialRoles: Role[] = [
  { name: "General user", viewUsers: true, editUsers: false, moderateContent: true },
  { name: "Page", viewUsers: true, editUsers: false, moderateContent: true },
  { name: "Party Member", viewUsers: true, editUsers: false, moderateContent: true },
  { name: "Elected Representative", viewUsers: true, editUsers: false, moderateContent: true },
  { name: "Candidate", viewUsers: true, editUsers: false, moderateContent: false },
  { name: "Election Observer", viewUsers: true, editUsers: false, moderateContent: false },
];

function CreateRoleModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (role: Role) => void;
}) {
  const [name, setName] = useState("");
  const [viewUsers, setViewUsers] = useState(true);
  const [editUsers, setEditUsers] = useState(false);
  const [moderateContent, setModerateContent] = useState(false);

  const permissions = [
    { label: "View users", value: viewUsers, set: setViewUsers },
    { label: "Edit users", value: editUsers, set: setEditUsers },
    { label: "Moderate content", value: moderateContent, set: setModerateContent },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            Create new role
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="role-name" className="mb-1.5 block text-sm text-gray-700">
              Role name
            </label>
            <input
              id="role-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Regional Moderator"
              autoFocus
              className={fieldInput}
            />
          </div>
          <div className="space-y-2.5">
            {permissions.map((p) => (
              <label key={p.label} className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={p.value}
                  onChange={(e) => p.set(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-800">{p.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!name.trim()}
            onClick={() =>
              onCreate({ name: name.trim(), viewUsers, editUsers, moderateContent })
            }
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium text-white",
              name.trim()
                ? "bg-primary hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            )}
          >
            Create role
          </button>
        </div>
      </div>
    </div>
  );
}

function RoleManagementTab() {
  const [roles, setRoles] = useState(initialRoles);
  const [creating, setCreating] = useState(false);

  function setPermission(name: string, key: keyof Omit<Role, "name">, value: boolean) {
    setRoles((prev) =>
      prev.map((r) => (r.name === name ? { ...r, [key]: value } : r))
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Roles list</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Each role defines what actions a user can perform across the
            platform.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create new role
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-100 bg-gray-50/50">
            <tr>
              {["Role Name", "View users", "Edit users", "Moderate content", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {roles.map((r) => (
              <tr key={r.name} className="hover:bg-gray-50/50">
                <td className="px-5 py-4 text-sm font-medium text-gray-900">
                  {r.name}
                </td>
                {(["viewUsers", "editUsers", "moderateContent"] as const).map(
                  (key) => (
                    <td key={key} className="px-5 py-4">
                      <input
                        type="checkbox"
                        aria-label={`${key === "viewUsers" ? "View users" : key === "editUsers" ? "Edit users" : "Moderate content"} for ${r.name}`}
                        checked={r[key]}
                        onChange={(e) =>
                          setPermission(r.name, key, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                  )
                )}
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Options for ${r.name}`}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            ← Previous
          </button>
          <div className="flex items-center gap-1 text-sm">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                className={cn(
                  "h-8 w-8 rounded-md",
                  n === 1
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-gray-400">…</span>
            {[8, 9, 10].map((n) => (
              <button
                key={n}
                type="button"
                className="h-8 w-8 rounded-md text-gray-600 hover:bg-gray-50"
              >
                {n}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Next →
          </button>
        </div>
      </div>

      {creating && (
        <CreateRoleModal
          onClose={() => setCreating(false)}
          onCreate={(role) => {
            setRoles((prev) => [...prev, role]);
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}

/* ------------------------- Security & Notifications ------------------------ */
/* Stand-ins consistent with the app style until their Figma screens arrive.  */

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-gray-200"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
          checked ? "left-[22px]" : "left-0.5"
        )}
      />
    </button>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(fieldInput, "pr-10")}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [updated, setUpdated] = useState(false);
  const [twoFa, setTwoFa] = useState(true);
  const [sessions, setSessions] = useState([
    { id: "s1", device: "Windows · Chrome", location: "Lagos, Nigeria", current: true, icon: "laptop" },
    { id: "s2", device: "iPhone 15 · Safari", location: "Lagos, Nigeria", current: false, icon: "phone" },
  ]);

  const canUpdate = current.length > 0 && next.length >= 8 && next === confirm;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Change password</h2>
        <p className="mt-0.5 text-sm text-gray-500">
          Use at least 8 characters. New password and confirmation must match.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <PasswordField id="current-password" label="Current password" value={current} onChange={setCurrent} />
          <PasswordField id="new-password" label="New password" value={next} onChange={setNext} />
          <PasswordField id="confirm-password" label="Confirm new password" value={confirm} onChange={setConfirm} />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            disabled={!canUpdate}
            onClick={() => {
              if (!canUpdate) return;
              setCurrent("");
              setNext("");
              setConfirm("");
              setUpdated(true);
              setTimeout(() => setUpdated(false), 2500);
            }}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium text-white",
              canUpdate ? "bg-primary hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
            )}
          >
            Update password
          </button>
          {updated && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <Check size={14} /> Password updated
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Two-factor authentication
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {twoFa ? "Enabled — codes sent to your email" : "Disabled"}
            </p>
          </div>
          <Toggle checked={twoFa} onChange={setTwoFa} label="Two-factor authentication" />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-base font-semibold text-gray-900">Active sessions</h2>
        <div className="mt-2 divide-y divide-gray-100">
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center gap-3 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                {s.icon === "laptop" ? <Laptop size={16} /> : <Smartphone size={16} />}
              </span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {s.device}
                  {s.current && (
                    <span className="ml-2 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                      This device
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{s.location}</div>
              </div>
              {!s.current && (
                <button
                  type="button"
                  onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))}
                  className="text-sm text-red-600 hover:underline"
                >
                  Sign out
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const notificationDefaults = [
  { id: "email", label: "Email notifications", description: "Receive account activity summaries by email.", on: true },
  { id: "push", label: "Push notifications", description: "Get real-time alerts in your browser.", on: true },
  { id: "weekly", label: "Weekly report digest", description: "A summary of platform analytics every Monday.", on: true },
  { id: "security", label: "Security alerts", description: "Sign-in attempts and account changes. Recommended.", on: true },
  { id: "product", label: "Product updates", description: "News about new admin features and improvements.", on: false },
];

function NotificationsTab() {
  const [prefs, setPrefs] = useState(notificationDefaults);

  return (
    <div className="max-w-3xl">
      <h2 className="text-base font-semibold text-gray-900">
        Notification preferences
      </h2>
      <p className="mt-0.5 text-sm text-gray-500">
        Choose what you want to be notified about.
      </p>
      <div className="mt-2 divide-y divide-gray-100">
        {prefs.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-6 py-4">
            <div>
              <div className="text-sm font-medium text-gray-900">{p.label}</div>
              <div className="mt-0.5 text-sm text-gray-500">{p.description}</div>
            </div>
            <Toggle
              checked={p.on}
              onChange={(v) =>
                setPrefs((prev) => prev.map((x) => (x.id === p.id ? { ...x, on: v } : x)))
              }
              label={p.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- Page ----------------------------------- */

export default function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Profile");

  return (
    <main className="px-6 py-6">
      {/* Identity */}
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-primary">
          JA
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-900">
              James Akintaro
            </h1>
            <span className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs text-gray-600">
              Super admin
            </span>
          </div>
          <p className="text-sm text-gray-500">jakintaro@gclout.com</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-6 overflow-x-auto border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px flex shrink-0 items-center gap-1.5 border-b-2 pb-3 text-sm transition-colors",
              tab === t
                ? "border-primary font-medium text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {t}
            {t === "Team" && (
              <span className="rounded-full bg-gray-100 px-1.5 text-xs text-gray-600">
                6
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Profile" && <ProfileTab />}
        {tab === "General" && <GeneralTab />}
        {tab === "Role management" && <RoleManagementTab />}
        {tab === "Security" && <SecurityTab />}
        {tab === "Notifications" && <NotificationsTab />}
        {(tab === "Team" || tab === "Billings") && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
            {tab} settings coming soon — share the Figma screen and we&apos;ll
            build it.
          </div>
        )}
      </div>
    </main>
  );
}
