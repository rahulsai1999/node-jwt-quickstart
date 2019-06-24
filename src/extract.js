import njwt from "njwt";

const extractid = headers => {
  const token = headers.authorization.split(" ")[1];
  return njwt.verify(token, '7x0jhxt"9(thpX6');
};

export default extractid;
