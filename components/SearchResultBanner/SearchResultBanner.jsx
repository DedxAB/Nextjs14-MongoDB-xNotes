import GradientText from '../GradientText';

const SearchResultBanner = ({ searchingFor, notes, users }) => {
  const totalResults = notes?.length + users?.length;
  return (
    <>
      <div className="font-bold text-gray-primary mb-6 mt-8">
        <GradientText className="text-4xl md:text-5xl py-1">
          Searching for {searchingFor}
        </GradientText>

        {notes?.length > 0 || users?.length > 0 ? (
          <h1 className="text-xl md:text-2xl my-2">
            Here {totalResults === 1 ? 'is' : 'are'} the {totalResults}{' '}
            {totalResults === 1 ? 'result' : 'results'}...
          </h1>
        ) : (
          <>
            <h1 className="text-xl md:text-2xl my-2">Oops!</h1>
          </>
        )}
      </div>
      <hr />
    </>
  );
};

export default SearchResultBanner;
