import { useEffect, useState } from "react";
import ConversationList from "./ConversationList";
import SidebarHeader from "./SidebarHeader";

interface SidebarProps {
  conversations: any[];
  activeConversationId: string | undefined;
  onSelectConversation: (id: string) => void;
}

const Sidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation
}: SidebarProps) => {
  const [search, setSearch] = useState("");
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  useEffect(() => {
    // Filter conversations based on search
    const filteredConversations = conversations.filter((conversation) => {
      return conversation.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredConversations(filteredConversations);
  }, [search, conversations]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <SidebarHeader
        onSearchChange={handleSearch}
      />
      <ConversationList
        conversations={filteredConversations}
        activeConversationId={activeConversationId}
        onSelectConversation={onSelectConversation}
      />
    </div>
  );
};

export default Sidebar;