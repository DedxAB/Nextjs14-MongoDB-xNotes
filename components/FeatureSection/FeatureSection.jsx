const FeatureSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Authentication */}
          <FeatureCard
            title="Authentication"
            description="Sign in with your Google account to access the features."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.274-5.6L3 10l5.726-2.4L12.055 7 12 8l-6 2.4zM5.726 12.4L9 14l3.273-1.6L14 12l-.045-1-6-2.4-.073 1z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          {/* Create Notes */}
          <FeatureCard
            title="Create Notes"
            description="Create notes and choose to publish them as 'Only Me' or 'Public'."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 6a2 2 0 100-4 2 2 0 000 4zM8 6a2 2 0 100-4 2 2 0 000 4zM4 10a2 2 0 100-4 2 2 0 000 4zM8 10a2 2 0 100-4 2 2 0 000 4zM12 10a2 2 0 100-4 2 2 0 000 4zM16 10a2 2 0 100-4 2 2 0 000 4zM4 14a2 2 0 100-4 2 2 0 000 4zM8 14a2 2 0 100-4 2 2 0 000 4zM12 14a2 2 0 100-4 2 2 0 000 4zM16 14a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          {/* Edit and Delete Notes */}
          <FeatureCard
            title="Edit and Delete Notes"
            description="Edit and delete your notes easily."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 011 1v2h6a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h6V3a1 1 0 011-1zm7 4H4v10h12V6zM6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm-1 5a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1zm0 3a1 1 0 011-1h2a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          {/* Search Functionality */}
          <FeatureCard
            title="Search Functionality"
            description="Quickly retrieve notes, users, and more."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a7 7 0 017 7c0 1.36-.4 2.63-1.09 3.71l3.85 3.86a1 1 0 01-1.42 1.42l-3.86-3.85A6.97 6.97 0 019 16a7 7 0 01-7-7 7 7 0 017-7zm0 2a5 5 0 00-5 5c0 1.76 1.79 3.23 3.77 4.89l-.14.15 1.42 1.42.14-.15c1.67 1.98 3.13 3.77 4.89 3.77a5 5 0 000-10zm0 1a4 4 0 00-4 4c0 1.21.55 2.28 1.41 3.01L8 12.83V13a1 1 0 002 0v-.17l-.41-.41A3.97 3.97 0 009 9zm0 1a3 3 0 100 6 3 3 0 000-6z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          {/* Like, Comment, and Share Notes */}
          <FeatureCard
            title="Like, Comment, and Share Notes"
            description="Interact with publicly published notes."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-purple-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M13.747 16.175a4.02 4.02 0 01-5.494-1.7l-.007-.014a.75.75 0 111.3-.776l.007.013a2.52 2.52 0 003.408 1.064l.014-.007.007-.013a.75.75 0 111.3.776l-.014.007a4.02 4.02 0 01-1.52 2.027l-.007.004.002.002a.75.75 0 01-.578.304h-.028a.75.75 0 01-.55-.243l-.002-.002-.007-.004zM10 2a5 5 0 110 10A5 5 0 0110 2z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          {/* Update Bio */}
          <FeatureCard
            title="Update Bio"
            description="Personalize your profile by updating your bio."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-pink-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm-3 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0-4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 8a3 3 0 013-3h4a1 1 0 010 2h-4a1 1 0 00-1 1v4a1 1 0 11-2 0v-4a3 3 0 013-3zm7-8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          {/* Social Media Links */}
          <FeatureCard
            title="Social Media Links"
            description="Add your social media links to your profile."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.472 10.858c-.02-.32.11-.64.344-.873l6.72-6.72a.75.75 0 011.06 0l6.72 6.72a.75.75 0 11-1.06 1.06L11 6.312V17a.75.75 0 01-1.5 0V6.31L3.537 11.923a.75.75 0 01-1.065-1.065l6.005-6.005a2.25 2.25 0 013.183 0l6.005 6.005a.75.75 0 11-1.065 1.065L11.5 6.311V17a2.25 2.25 0 01-4.5 0V6.312L2.472 10.858z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-full p-4">{icon}</div>
      <h3 className="text-xl font-semibold mt-4 text-center">{title}</h3>
      <p className=" text-gray-500 text-center">{description}</p>
    </div>
  );
};

export default FeatureSection;
