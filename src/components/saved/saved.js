import "./saved.css";

const Saved = ({ saved, setSaved }) => {
  const handleDelete = (index) => {
    saved.splice(index, 1);
    setSaved([...saved]);
    localStorage.setItem("saved", JSON.stringify(saved));
  };

  return (
    <div className="Saved">
      {saved.length > 0 && (
        <>
          <h2>Saved:</h2>
          <div className="saved-container">
            {saved &&
              saved.map((item, index) => (
                <div className="saved-items" key={index}>
                  <h2 className="saved-items-text">{item}</h2>
                  <img
                    src="/icons/x.svg"
                    alt="Delete item icon"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Saved;
