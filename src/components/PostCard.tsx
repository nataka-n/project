import React, { useState } from "react";
import styled from "styled-components";
import PostMenu from "./PostMenu";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  onDelete: (id: number) => void;
}

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 400px;
  position: relative;
  transition: all 0.3s ease;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 300px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 26px;
  right: 10px;
  top: 6px;
`;

const PostCard: React.FC<PostCardProps> = ({ id, title, content, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [contentCard, setContentCard] = useState<string>(content);


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  }

  const handleEdit = () => {
    const newContent = prompt("Введите новый текст поста:", contentCard);
    if (newContent) {
      setContentCard(newContent);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить '${title}' пост?`)) {
      onDelete(id);
    }
  };

  return (
    <Card>
      <h2>{title}</h2>
      <p>{contentCard}</p>
      <p>{isFavorite ? "⭐ В избранном" : ""}</p>
      <MenuButton onClick={toggleMenu}>⋮</MenuButton>
      {showMenu && (
        <PostMenu
          onFavorite={toggleFavorite}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Card>
  );
};

export default PostCard