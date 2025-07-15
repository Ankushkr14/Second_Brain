export const UseCaseSection = () => {
    return (
        <div className="w-full py-20 flex flex-col items-center justify-center">
            <div className="max-w-7xl mx-auto text-center px-4">
                <h1 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-gray-200 to-purple-300 bg-clip-text text-transparent leading-tight">
                    Unlock the Value of Your Links<br />
                    Capture, Organize, and Access Your Ideas
                </h1>
                <p className="text-md md:text-lg mb-8 text-gray-300">
                    Transform your digital clutter into a structured second brain. Capture links, notes, and ideas effortlessly, and access them anytime, anywhere.
                </p>
                <div className="grid md:grid-cols-4 gap-8 mt-12">
                    {/* Card 1 */}
                    <div className="bg-gray-200 rounded-2xl px-4 py-8 shadow-lg hover:shadow-xl transition-shadow ">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            🧩 Organize Everything in One Place
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Save and structure your most valuable links, notes, and ideas — all in a single, searchable space.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-200 rounded-2xl px-4 py-8 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            🗂️ Stay Sorted and Synced
                        </h3>
                        <p className="text-gray-600 leading-relaxed pt-7">
                            Tag and categorize content your way. Instantly retrieve what you need, exactly when you need it.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-200 rounded-2xl px-4 py-8 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            🔗 Capture More Than Just Links
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Attach notes, media, and embeds to any link. Build context, keep insights, and access it all on demand.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-gray-200 rounded-2xl px-4 py-8 shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            🤝 Collaborate and Share Easily
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Invite teammates, classmates, or collaborators to view or Collaborate — knowledge is better when shared.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}