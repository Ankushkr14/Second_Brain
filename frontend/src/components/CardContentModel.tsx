import { Card } from "./UI/Card";
import Masonry from 'react-masonry-css';
import { CardSkeleton } from "./UI/CardSkeleton";
import { PlusIcon } from "./icons/plusIcon";

interface EmptyStateProps{
    onAddContent: () => void;
}


export function CardContentModel({cards, loading, deleteCard, onAddContent, onShare}: 
    {
        cards: any[], 
        loading: boolean, 
        deleteCard: (id: string, title:string) => void, 
        onAddContent: () => void,
        onShare: (id: string) => void
    }){

    const breakpointColumnsObj = {
      default: 4,
      1300: 3,
      1000: 2,
      500: 1
    };

    if (loading) {
        return (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-3 p-4 pt-8"
              columnClassName="bg-clip-padding"
            >
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="mb-3">
                        <CardSkeleton/>
                    </div>
                ))}
            </Masonry>
        );
    }

    const EmptyState = ({ onAddContent }: EmptyStateProps) => {
        return (
            <div className="text-center flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg mt-8 mx-4 border-slate-500">
                <h3 className="mt-2 text-lg font-medium text-gray-900">No content found</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't added any content yet.</p>
                <div className="mt-6">
                    <button
                    type="button"
                    onClick={onAddContent}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    <PlusIcon size="lg" />
                    <span className="ml-2">Add Your First Content</span>
                    </button>
                </div>
            </div>
        )
    }

    if(cards.length === 0){
        return (
            <EmptyState onAddContent={onAddContent}/>
        )
    }


    return (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-3 p-4 pt-8"
          columnClassName="bg-clip-padding"
        >
            {cards.map((card) => (
                    <div key={card._id} className="mb-3"> 
                        <Card
                            _id={card._id}
                            title={card.title}
                            link={card.link}
                            type={card.type}
                            tag={card.tag}
                            isDelete = {true}
                            isShare = {false}
                            onDelete={deleteCard}
                            onShare = {onShare}
                        />
                    </div>
                ))
            }
        </Masonry>
    )
}