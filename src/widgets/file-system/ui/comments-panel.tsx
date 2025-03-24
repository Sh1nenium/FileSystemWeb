import { formatDate } from '@/shared/utils/convert';
import styles from './CommentsPanel.module.scss';
import { Commentary } from '@/entities/explorer-object/model/types';
import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface CommentsPanelProps {
  comments: Commentary[];
  sessionUsername: string;
  onDeleteComment: (commentId: string) => void;
  onAddComment: (content: string) => void;
}

export function CommentsPanel({ comments, sessionUsername, onDeleteComment, onAddComment }: CommentsPanelProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = useCallback(async () => {
    if (newComment.trim()) {
      setIsSubmitting(true);
      try {
        await onAddComment(newComment);
        setNewComment('');
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [newComment, onAddComment]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAddComment();
    }
  };

  return (
    <div className={styles['comments-panel']}>
      <div className={styles['comments-list']}>
        <AnimatePresence>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                className={styles['comment']}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles['comment-header']}>
                  <span className={styles['comment-author']}>{comment.username}</span>
                  <span className={styles['comment-date']}>{formatDate(comment.createdAt)}</span>
                </div>
                <p className={styles['comment-text']}>{comment.content}</p>
                {comment.username === sessionUsername && (
                  <button
                    className={styles['delete-button']}
                    onClick={() => onDeleteComment(comment.id)}
                    aria-label="Удалить комментарий"
                  >
                    &times;
                  </button>
                )}
              </motion.div>
            ))
          ) : (
            <motion.p
              className={styles['no-comments']}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Нет комментариев
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className={styles['add-comment']}>
        <textarea
          className={styles['comment-input']}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Напишите комментарий..."
          disabled={isSubmitting}
          aria-label="Напишите новый комментарий"
        />
        <button
          className={styles['submit-button']}
          onClick={handleAddComment}
          disabled={isSubmitting || !newComment.trim()}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </div>
  );
}
