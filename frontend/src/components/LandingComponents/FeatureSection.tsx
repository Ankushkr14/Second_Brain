export const FeatureSection = () => {
    return(
        <div className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Feature Grid */}
                <div className="flex flex-wrap justify-center gap-14 text-white">
                    <div className="flex items-center gap-4 text-lg hover:scale-105 transition-transform duration-200">
                        <span>✨</span>
                        <span>Capture Instantly</span>
                    </div>
                    <div className="flex items-center gap-4 text-lg hover:scale-105 transition-transform duration-200">
                        <span>📚</span>
                        <span>Organize Smartly</span>
                    </div>
                    <div className="flex items-center gap-4 text-lg hover:scale-105 transition-transform duration-200">
                        <span>🔍</span>
                        <span>Recall Effortlessly</span>
                    </div>
                    <div className="flex items-center gap-4 text-lg hover:scale-105 transition-transform duration-200">
                        <span>🔄</span>
                        <span>Sync Everything</span>
                    </div>
                    <div className="flex items-center gap-4 text-lg hover:scale-105 transition-transform duration-200">
                        <span>🏷️</span>
                        <span>Tag & Link Ideas</span>
                    </div>
                </div>
            </div>
        </div>

    )
}