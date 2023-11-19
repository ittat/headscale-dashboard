const StatusDot = (props: {
  stutus: boolean;
  activeClass: string;
  activeLabel: string;
  inactiveLabel: string;
}) => {
  return props.stutus ? (
    <span className="flex gap-1 items-center">
      {" "}
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full  ${props.activeClass} opacity-75`}></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      {props.activeLabel}
    </span>
  ) : (
    <span className="flex gap-1 items-center">
      {" "}
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
      </span>
      {props.inactiveLabel}
    </span>
  );
};

export default StatusDot;