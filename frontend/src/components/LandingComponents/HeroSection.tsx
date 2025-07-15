export const HeroSection = () => {
    return (
        <div className="flex items-center justify-center h-full text-white">
            <div className="text-center max-w-4xl px-4">
                <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-white to-purple-300 bg-clip-text text-transparent leading-tight">
                    Capture Ideas Instantly,<br/>
                    Access Knowledge Seamlessly
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
                    Build your digital second brain to manage notes, bookmarks, tasks, and ideas — all in one immersive space. Stay organized, focused, and in flow.
                </p>
                
                {/* Two Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                        Start Building Your Brain 🧠
                    </button>
                    <button className="border border-purple-400 text-purple-300 px-8 py-4 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-colors">
                        Explore a Live Demo
                    </button>
                </div>
            </div>
        </div>
    )
}