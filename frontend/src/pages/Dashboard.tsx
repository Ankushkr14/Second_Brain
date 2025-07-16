import { PlusIcon } from '../components/icons/plusIcon'
import { Button } from '../components/UI/Buttton'
import { CreateContentModel } from '../components/CreateContentModel'
import { useState } from 'react'
import { Sidebar } from '../components/UI/Sidebar';
import { CardContentModel } from '../components/CardContentModel'
import { useRefreshCard } from '../components/customHooks/refreshCard'
import { ShareContentModel } from '../components/ShareContentModel'
import { SearchComponent, SearchFilters } from '../components/SearchComponent'
import { ShareIconNew } from '../components/icons/ShareIcon_1'
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModel';
import { BrainShareModel } from '../components/BrainShareModel';
import { useLoading } from '../context/LoadingContext';
import { toast } from 'react-toastify';


function Dashboard() {

  const [modalOpen, setModelOpen] = useState(false);
  const [shareModelOpen, setShareModelOpen] = useState(false);
  const [contentIdShare, setContentIdShare] = useState<string | null>(null);
  const { cards, loading, deleteCard, fetchCards } = useRefreshCard();
  const { showLoading, hideLoading } = useLoading();
  const [activeItem, setActiveItem] = useState("All Content");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    contentType: [],
    tags: []
  });
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<{ id: string, title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBrainShare, setShowBrainShare] = useState(false);


  const handleShare = (id: string) => {
    setContentIdShare(id);
    setShareModelOpen(true);
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const handleDeleteContent = (id: string, title: string) => {
    setContentToDelete({ id, title });
    setDeleteModelOpen(true);
  }

  const handleConfirmDelete = async () => {
    if (!contentToDelete) return;
    setIsDeleting(true);
    showLoading("Deleting content...");
    try {
      await deleteCard(contentToDelete.id);
      setDeleteModelOpen(false);
      setContentToDelete(null);
    } catch (error) {
      toast.error("Failed to delete content. Please try again.");
    } finally {
      setIsDeleting(false);
      hideLoading();
    }
  };

  const handleCancelDelete = () => {
    if (isDeleting) return;
    setDeleteModelOpen(false);
    setContentToDelete(null);
  };

  const availableTags = Array.from(new Set(
    cards.flatMap(card => Array.isArray(card.tag) ? card.tag.map((t: any) => t.title) : [])
  ));

  const filterCards = cards.filter(card => {
    if (activeItem === "Twitter" && card.type !== "twitter") return false;
    if (activeItem === "Youtube" && card.type !== "youtube") return false;
    if (activeItem === "URL" && card.type !== "url") return false;

    if (searchTerm && activeItem === "Search") {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = card.title.toLowerCase().includes(searchLower);
      const tagMatch = Array.isArray(card.tag) && card.tag.some((t: any) =>
        t.title.toLowerCase().includes(searchLower)
      );
      if (!titleMatch && !tagMatch) return false;
    }

    if (activeItem === "Search") {
      if (searchFilters.contentType.length > 0 && !searchFilters.contentType.includes(card.type)) {
        return false;
      }

      if (searchFilters.tags.length > 0) {
        const cardTags = Array.isArray(card.tag) ? card.tag.map((t: any) => t.title) : [];
        const hasMatchingTag = searchFilters.tags.some(filterTag => cardTags.includes(filterTag));
        if (!hasMatchingTag) return false;
      }
    }

    return true;
  });

  const sortedCards = filterCards;

  return (
    <div>
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className='flex-1 lg:ml-64 min-h-screen bg-gradient-to-br from-gray-50 to-white'>
        <div className='flex flex-col px-6 py-6 lg:px-8 lg:py-8'>
          <CreateContentModel
            open={modalOpen}
            onClose={() => {
              setModelOpen(false);
            }}
            onContentAdded={fetchCards}
          />

          {contentIdShare && (
            <ShareContentModel
              open={shareModelOpen}
              onClose={() => {
                setShareModelOpen(false);
                setContentIdShare(null);
              }}
              contentId={contentIdShare}
            />
          )}

          {deleteModelOpen && (
            <DeleteConfirmationModal
              open={deleteModelOpen}
              onClose={()=> handleCancelDelete()}
              onDelete={handleConfirmDelete}
              title="Delete Content"
              message={`Are you sure you want to delete? This action cannot be undone.`}
              confirmText="Delete"
              cancelText="Cancel"
              isLoading={isDeleting}
            />
          )}

          <BrainShareModel
            open={showBrainShare}
            onClose={() => setShowBrainShare(false)}
          />



          <div className='flex justify-end gap-4 pt-2'>
            <Button onClick={() => setModelOpen(true)} variant='primary' startIcon={<PlusIcon size='md' />} size='md' text='Add Content' />
            <Button variant='secondary' startIcon={<ShareIconNew />} size='md' text='Share Brain' onClick={() => setShowBrainShare(true)} />
          </div>

          {activeItem === "Search" && (
            <SearchComponent
              onSearchChange={handleSearchChange}
              onFiltersChange={handleFiltersChange}
              availableTags={availableTags}
            />
          )}

          <div>
            <CardContentModel
              cards={sortedCards}
              loading={loading}
              deleteCard={handleDeleteContent}
              onAddContent={() => setModelOpen(true)}
              onShare={handleShare}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
