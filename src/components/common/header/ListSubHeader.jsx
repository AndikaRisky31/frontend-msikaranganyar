import { Link } from "react-router-dom";

const ListSubHeader = ({ title, to, disable }) => {
  return (
    <>
      <div className={`group hover:bg-teal-400  text-justify ${disable ? 'cursor-not-allowed' : ''}`}>
        <Link className={`text-white font-semibold block p-4 ${disable ? 'cursor-not-allowed' : ''}`} to={to}>{title}</Link>
      </div>
    </>
  );
};

export default ListSubHeader;
