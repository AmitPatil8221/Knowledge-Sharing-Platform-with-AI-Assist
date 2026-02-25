import { useState } from 'react';
import { toast } from 'react-toastify';
import { aiAPI } from '../services/api';

const AIModal = ({ show, onClose, onGenerate, type }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.warning('Please enter a prompt');
      return;
    }
    
    setLoading(true);
    try {
      const promptToSend = type === 'summary' ? prompt : prompt;
      const response = await aiAPI.generate({ prompt: promptToSend, type });
      onGenerate(response.data.content);
      setPrompt('');
      onClose();
      toast.success(`AI ${type === 'content' ? 'content' : type === 'summary' ? 'summary' : type === 'tags' ? 'tags' : type === 'improve' ? 'improvements' : 'title'} generated successfully!`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">AI {type === 'content' ? 'Generate Content' : type === 'summary' ? 'Generate Summary' : type === 'tags' ? 'Generate Tags' : type === 'improve' ? 'Improve Content' : 'Suggest Title'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              rows="4"
              placeholder={type === 'content' ? 'Enter topic (e.g., React Hooks)...' : type === 'summary' ? 'Paste content to summarize...' : type === 'tags' ? 'Enter content for tag generation...' : type === 'improve' ? 'Paste content to improve...' : 'Paste content for title suggestion...'}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
