import { Helmet } from "react-helmet";
const PageTitle = ({ title, desc }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {desc && <meta name="description" content={desc} />}
    </Helmet>
  );
};
export default PageTitle;
