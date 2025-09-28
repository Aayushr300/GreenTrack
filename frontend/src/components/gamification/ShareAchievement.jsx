import React from "react";

const ShareAchievement = ({ achievement, onClose }) => {
  if (!achievement) return null;

  const shareText = `I just ${achievement.description} on GreenTrack! ${
    achievement.hashtags || "#ClimateAction #CarbonNeutral"
  }`;

  const shareOptions = [
    {
      platform: "twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}`,
      icon: "🐦",
      name: "Twitter",
    },
    {
      platform: "linkedin",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        "https://greentrack.app"
      )}&summary=${encodeURIComponent(shareText)}`,
      icon: "💼",
      name: "LinkedIn",
    },
    {
      platform: "facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        "https://greentrack.app"
      )}&quote=${encodeURIComponent(shareText)}`,
      icon: "👥",
      name: "Facebook",
    },
    {
      platform: "whatsapp",
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      icon: "💚",
      name: "WhatsApp",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Achievement copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-xl font-bold text-gray-900">
            Achievement Unlocked!
          </h3>
          <p className="text-gray-600 mt-2">{achievement.message}</p>
        </div>

        {/* Share Options */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 text-center">
            Share your achievement
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <a
                key={option.platform}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg">{option.icon}</span>
                <span className="font-medium text-sm">{option.name}</span>
              </a>
            ))}
          </div>

          {/* Copy to Clipboard */}
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center space-x-2 p-3 border border-green-300 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span>📋</span>
            <span className="font-medium">Copy to Clipboard</span>
          </button>
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareAchievement;
