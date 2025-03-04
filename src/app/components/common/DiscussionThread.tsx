import React from "react";
import styled from "styled-components";

const SThreadContainer = styled.div`
  width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.color.color_3};
  background-color: ${({ theme }) => theme.color.color_2_5};
`;

const SComment = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color.color_3};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SUsername = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.color.color_7};
`;

const STimestamp = styled.div`
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 5px;
`;

const SCommentText = styled.p`
  margin: 5px 0 0;
`;

const DiscussionThread = ({ comments }: any) => {
  return (
    <SThreadContainer>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment: any, index: number) => (
          <SComment key={index}>
            <SUsername>{comment.username}</SUsername>
            <STimestamp>{new Date(comment.S).toLocaleString()}</STimestamp>
            <SCommentText>{comment.text}</SCommentText>
          </SComment>
        ))
      )}
    </SThreadContainer>
  );
};

export default DiscussionThread;