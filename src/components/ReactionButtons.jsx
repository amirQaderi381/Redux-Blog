import { useDispatch } from "react-redux";
import { addedReaction } from "../reducers/BlogSlice";

const reactionEmoji = {
  thumpup: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ blog }) => {

  const dispatch = useDispatch();

  const renderReactions = Object.entries(reactionEmoji).map(
    ([reactionName, reactionEmoji]) => (
      <button
        className="reaction-button muted-button"
        key={reactionName}
        type="button"
        onClick={() => dispatch(addedReaction({blogId : blog.id , reaction : reactionName}))}
      >
        {reactionEmoji} {blog.reactions[reactionName]}
      </button>
    ),
  );

  return <div>{renderReactions}</div>;
};

export default ReactionButtons;
