import PhotoTurkey from "./../../../images/turkey.png"

function FirstPart() {
  return (
    <>
      <div
        className="bg-image p-5 text-center shadow-1-strong rounded text-white w-60"
        style={{
          backgroundImage: `url(${PhotoTurkey})`,
          height: "100vh"
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <h1 className="text-white mb-3">Where do you want to go today?</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstPart;