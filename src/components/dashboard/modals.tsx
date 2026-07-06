"use client";

import { useState } from "react";
import {
  AlertOctagon,
  Ban,
  Calendar,
  ChevronDown,
  FileText,
  UserCog,
  Voicemail,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ModalShell({
  children,
  onClose,
  icon,
  iconClass,
}: {
  children: React.ReactNode;
  onClose: () => void;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <span
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              iconClass
            )}
          >
            {icon}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const fieldLabel = "block text-sm text-gray-700 mb-1.5";
const fieldInput =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary";

const cancelBtn =
  "rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50";

interface SuspendUserModalProps {
  userName: string;
  onClose: () => void;
  onConfirm: (notify: boolean) => void;
}

export function SuspendUserModal({ userName, onClose, onConfirm }: SuspendUserModalProps) {
  const [reason, setReason] = useState("Violation");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [permanent, setPermanent] = useState(false);
  const [description, setDescription] = useState("");

  return (
    <ModalShell
      onClose={onClose}
      icon={<AlertOctagon size={22} className="text-red-500" />}
      iconClass="bg-red-50"
    >
      <h2 className="mt-4 text-lg font-semibold text-gray-900">Suspend user?</h2>
      <p className="mt-1 text-sm text-gray-500">
        Are you sure you want to suspend &ldquo;{userName}&rdquo; account? This
        will temporarily make their account inactive, do you want to proceed?
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="suspend-reason" className={fieldLabel}>
            Reason for suspension
          </label>
          <div className="relative">
            <select
              id="suspend-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={cn(fieldInput, "appearance-none pr-9")}
            >
              <option>Violation</option>
              <option>Hate Speech</option>
              <option>Misinformation</option>
              <option>Impersonation</option>
              <option>Spam</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="suspend-starts" className={fieldLabel}>
              Suspension starts
            </label>
            <div className="relative">
              <input
                id="suspend-starts"
                type="date"
                value={starts}
                onChange={(e) => setStarts(e.target.value)}
                disabled={permanent}
                className={cn(fieldInput, "pr-9 disabled:bg-gray-50 disabled:text-gray-400")}
              />
              <Calendar
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="suspend-ends" className={fieldLabel}>
              Suspension ends
            </label>
            <div className="relative">
              <input
                id="suspend-ends"
                type="date"
                value={ends}
                onChange={(e) => setEnds(e.target.value)}
                disabled={permanent}
                className={cn(fieldInput, "pr-9 disabled:bg-gray-50 disabled:text-gray-400")}
              />
              <Calendar
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={permanent}
            onChange={(e) => setPermanent(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          This is a permanent suspension
        </label>

        <div>
          <label htmlFor="suspend-description" className={fieldLabel}>
            Description
          </label>
          <textarea
            id="suspend-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="suspension summary..."
            rows={5}
            className={cn(fieldInput, "resize-none")}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button type="button" onClick={onClose} className={cancelBtn}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(false)}
          className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Suspend only
        </button>
        <button
          type="button"
          onClick={() => onConfirm(true)}
          className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Suspend &amp; notify
        </button>
      </div>
    </ModalShell>
  );
}

interface ReactivateUserModalProps {
  userName: string;
  onClose: () => void;
  onConfirm: (notify: boolean) => void;
}

export function ReactivateUserModal({
  userName,
  onClose,
  onConfirm,
}: ReactivateUserModalProps) {
  return (
    <ModalShell
      onClose={onClose}
      icon={<Voicemail size={22} className="text-primary" />}
      iconClass="bg-blue-50"
    >
      <h2 className="mt-4 text-lg font-semibold text-gray-900">Reactivate user?</h2>
      <p className="mt-1 text-sm text-gray-500">
        Are you sure you want to reactivate &ldquo;{userName}&rdquo; account?
        This action will bring their account back into proper activity, do you
        want to proceed?
      </p>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button type="button" onClick={onClose} className={cancelBtn}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(false)}
          className="rounded-lg border border-blue-300 px-4 py-2.5 text-sm font-medium text-primary hover:bg-blue-50"
        >
          Reactivate only
        </button>
        <button
          type="button"
          onClick={() => onConfirm(true)}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Reactivate &amp; notify
        </button>
      </div>
    </ModalShell>
  );
}

export interface ApplicationField {
  label: string;
  value: string;
}

interface ApplicationReviewModalProps {
  title?: string;
  fields: ApplicationField[];
  statement: string;
  documentName?: string;
  documentSize?: string;
  onClose: () => void;
  onReject: () => void;
  onUpgrade: () => void;
}

export function ApplicationReviewModal({
  title = "Upgrade request",
  fields,
  statement,
  documentName = "Membership certificate.pdf",
  documentSize = "4.2 MB",
  onClose,
  onReject,
  onUpgrade,
}: ApplicationReviewModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between p-5 pb-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <UserCog size={16} />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          <h2 className="mt-3 text-base font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">
            This user has requested an upgrade, kindly review and take action.
          </p>

          <div className="mt-4 divide-y divide-gray-100 rounded-xl bg-gray-50 px-4">
            {fields.map((f) => (
              <div key={f.label} className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">{f.label}</span>
                <span className="text-sm font-medium text-gray-900">
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-gray-50 p-4">
            <div className="text-xs text-gray-500">Supporting Document</div>
            <div className="mt-2 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-red-600 text-white">
                <FileText size={16} />
              </span>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {documentName}
                </div>
                <div className="text-xs text-gray-500">{documentSize}</div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-gray-50 p-4">
            <div className="text-xs text-gray-500">Statement of Intent</div>
            <div className="mt-2 space-y-3 text-sm leading-relaxed text-gray-700">
              {statement.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-5">
          <button
            type="button"
            onClick={onReject}
            className="flex-1 rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Reject application
          </button>
          <button
            type="button"
            onClick={onUpgrade}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Upgrade user
          </button>
        </div>
      </div>
    </div>
  );
}

interface DowngradeUserModalProps {
  userName: string;
  currentRole: string;
  onClose: () => void;
  onConfirm: (notify: boolean) => void;
}

export function DowngradeUserModal({
  userName,
  currentRole,
  onClose,
  onConfirm,
}: DowngradeUserModalProps) {
  return (
    <ModalShell
      onClose={onClose}
      icon={<AlertOctagon size={22} className="text-primary" />}
      iconClass="bg-blue-50"
    >
      <h2 className="mt-4 text-lg font-semibold text-gray-900">Downgrade user?</h2>
      <p className="mt-1 text-sm text-gray-500">
        Are you sure you want to downgrade &ldquo;{userName}&rdquo; from{" "}
        {currentRole} back to Citizen? They will lose their elevated
        privileges, do you want to proceed?
      </p>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button type="button" onClick={onClose} className={cancelBtn}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(false)}
          className="rounded-lg border border-blue-300 px-4 py-2.5 text-sm font-medium text-primary hover:bg-blue-50"
        >
          Downgrade only
        </button>
        <button
          type="button"
          onClick={() => onConfirm(true)}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Downgrade &amp; notify
        </button>
      </div>
    </ModalShell>
  );
}

interface RejectApplicationModalProps {
  applicantName: string;
  onClose: () => void;
  onConfirm: (notify: boolean) => void;
}

export function RejectApplicationModal({
  applicantName,
  onClose,
  onConfirm,
}: RejectApplicationModalProps) {
  const [reason, setReason] = useState("Incomplete documents");
  const [description, setDescription] = useState("");

  return (
    <ModalShell
      onClose={onClose}
      icon={<Ban size={22} className="text-red-500" />}
      iconClass="bg-red-50"
    >
      <h2 className="mt-4 text-lg font-semibold text-gray-900">
        Reject application
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Please provide your reasons for rejecting {applicantName}&apos;s
        application. This information will be shared with the applicant
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="reject-reason" className={fieldLabel}>
            Reason for rejection
          </label>
          <div className="relative">
            <select
              id="reject-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={cn(fieldInput, "appearance-none pr-9")}
            >
              <option>Incomplete documents</option>
              <option>Failed verification</option>
              <option>Ineligible role</option>
              <option>Duplicate application</option>
              <option>Other</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reject-description" className={fieldLabel}>
            Description
          </label>
          <textarea
            id="reject-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="rejection summary..."
            rows={6}
            className={cn(fieldInput, "resize-none")}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button type="button" onClick={onClose} className={cancelBtn}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(false)}
          className="rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Reject only
        </button>
        <button
          type="button"
          onClick={() => onConfirm(true)}
          className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Reject &amp; notify
        </button>
      </div>
    </ModalShell>
  );
}
