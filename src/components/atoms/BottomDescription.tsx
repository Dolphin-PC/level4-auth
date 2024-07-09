const BottomDescription = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
      }}
    >
      <small>
        <p>API(mixed-content)오류가 발생할 땐,</p>
        chrome://settings/content/siteDetails?site={window.location.href}
        <p>
          <strong>안전하지 않은 콘텐츠 - 허용</strong>으로 변경바랍니다.
        </p>
      </small>
    </div>
  );
};

export default BottomDescription;
