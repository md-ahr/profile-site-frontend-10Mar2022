const Logout = ({ handleLogout }) => {
  return (
    <div className="mt-6 pt-4 border-t text-center">
        <button type="button" onClick={handleLogout} className="text-sm font-medium text-sky-600">Logout</button>
    </div>
  );
};

export default Logout;