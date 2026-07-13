import { useState } from "react";
import type { IUser } from "./types/user.types";
import UserForm from "./components/UserForm";
import { formatDate, truncateId } from "./utils/helpers";

const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleAddUser = (user: IUser) => {
    try {
      setUsers((prev) => [...prev, user]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRandomNumber = () => {
    if (users.length === 0) {
      return;
    }
    const rndNumber = Math.floor(Math.random() * users.length);
    setRandomNumber(rndNumber);
    const user = users[rndNumber];
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-2xl space-y-10">
        {/* ── Header ── */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            User Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Add users, manage your list &amp; generate random numbers
          </p>
        </header>

        {/* ── Main Card: Form + Random Number ── */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:shadow-black/40 hover:border-slate-700/80">
          <UserForm onAddUser={handleAddUser} />

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">or</span>
            <span className="h-px flex-1 bg-linear-to-r from-transparent via-slate-700 to-transparent" />
          </div>

          {/* Random Number Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleRandomNumber}
              disabled={users.length === 0}
              className="relative cursor-pointer overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-300
                         hover:border-emerald-500/60 hover:text-emerald-300 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-emerald-500/10
                         focus:outline-none focus:ring-4 focus:ring-emerald-400/20
                         active:scale-95
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-slate-700 disabled:hover:text-slate-300 disabled:hover:bg-slate-800/50 disabled:hover:shadow-none"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9.172 9.172a4 4 0 015.656 0M9.172 9.172l-4.95-4.95M19.778 19.778l-4.95-4.95M12 3v2M12 19v2M3 12h2M19 12h2" />
                </svg>
                Get Random Number
              </span>
            </button>

            {/* Random Number + User Info Card */}
            <div className="flex-1 w-full rounded-xl border border-dashed border-slate-700/60 bg-slate-800/30 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-slate-600/80">
              {selectedUser !== null ? (
                <div className="flex items-start gap-4 animate-[fadeIn_0.3s_ease-out]">
                  {/* Random Number Display */}
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Number
                    </span>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 shadow-sm shadow-emerald-500/10">
                      <span className="text-2xl font-bold text-emerald-400 tabular-nums">
                        {randomNumber}
                      </span>
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <div className="hidden sm:block w-px self-stretch bg-slate-700/50" />

                  {/* User Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                        Random User
                      </h3>
                      <button
                        onClick={() => {
                          setSelectedUser(null);
                          setRandomNumber(null);
                        }}
                        className="rounded-full p-1 text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition-colors"
                        title="Clear selection"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white shadow-sm shadow-emerald-500/30">
                        {selectedUser.name?.charAt?.(0)?.toUpperCase?.() || "?"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {selectedUser.name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDate(selectedUser.registeredAt)}
                        </span>
                      </div>
                    </div>

                    {/* Partial ID display */}
                    <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 px-3 py-1.5 font-mono text-xs text-slate-400">
                      <span className="text-slate-500">ID:</span>
                      <span className="text-indigo-300" title={selectedUser.id}>
                        {truncateId(selectedUser.id)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-15">
                  <span className="text-sm text-slate-500 italic">
                    Click the button to pick a random user
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Users List Section ── */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:shadow-black/40 hover:border-slate-700/80">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Users
              {users.length > 0 && (
                <span className="ml-2 rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-400">
                  {users.length}
                </span>
              )}
            </h2>
          </div>

          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/60 ring-1 ring-slate-700/50">
                <svg className="h-7 w-7 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-400">No users added yet</p>
              <p className="mt-1 text-xs text-slate-500">Use the form above to add your first user</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/40 px-4 py-3 backdrop-blur-sm transition-all duration-300 
                             hover:border-slate-700 hover:bg-slate-800/70 hover:shadow-md hover:shadow-black/10 hover:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-sm shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110">
                      {user.name.charAt?.(0)?.toUpperCase?.() || "?"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-white">
                        {user.name}
                      </span>
                      {user.registeredAt && (
                        <span className="text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                          {formatDate(user.registeredAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  <svg className="h-4 w-4 text-slate-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-xs text-slate-600">
          Built with React &amp; Tailwind CSS v4
        </p>
      </div>
    </div>
  );
};

export default App;