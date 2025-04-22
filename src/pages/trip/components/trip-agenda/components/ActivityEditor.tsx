import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, EditMode } from '../types';
import { FaSave, FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

interface ActivityEditorProps {
  activity: Activity | null;
  mode: EditMode;
  dayIndex: number;
  onSave: (activity: Activity) => void;
  onCancel: () => void;
}

function ActivityEditor({
  activity,
  mode,
  dayIndex,
  onSave,
  onCancel,
}: ActivityEditorProps) {
  const [formData, setFormData] = useState<Activity>({
    id: '',
    title: '',
    type: 'other',
    time: '',
    details: '',
    location: '',
    from: '',
    to: '',
    completed: false,
  });

  useEffect(() => {
    if (mode === EditMode.Edit && activity) {
      setFormData({ ...activity });
    } else if (mode === EditMode.Add) {
      setFormData({
        id: uuidv4(),
        title: '',
        type: 'other',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        details: '',
        location: '',
        from: '',
        to: '',
        completed: false,
      });
    }
  }, [activity, mode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      className='activity-editor-overlay'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='activity-editor'
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className='editor-header'>
          <h3>
            {mode === EditMode.Add ? 'Aggiungi attività' : 'Modifica attività'}
          </h3>
          <button
            className='close-button'
            onClick={onCancel}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Titolo</label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='type'>Tipo</label>
            <select
              id='type'
              name='type'
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value='flight'>Volo</option>
              <option value='hotel'>Hotel</option>
              <option value='park'>Parco</option>
              <option value='hiking'>Escursione</option>
              <option value='food'>Cibo</option>
              <option value='other'>Altro</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='time'>Orario</label>
            <input
              type='text'
              id='time'
              name='time'
              value={formData.time}
              onChange={handleChange}
              placeholder='es. 14:30'
              required
            />
          </div>

          {formData.type === 'flight' && (
            <>
              <div className='form-group'>
                <label htmlFor='from'>Da</label>
                <input
                  type='text'
                  id='from'
                  name='from'
                  value={formData.from || ''}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='to'>A</label>
                <input
                  type='text'
                  id='to'
                  name='to'
                  value={formData.to || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {formData.type !== 'flight' && (
            <div className='form-group'>
              <label htmlFor='location'>Luogo</label>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location || ''}
                onChange={handleChange}
              />
            </div>
          )}

          <div className='form-group'>
            <label htmlFor='details'>Dettagli</label>
            <textarea
              id='details'
              name='details'
              value={formData.details || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className='form-actions'>
            <button
              type='button'
              className='cancel-btn'
              onClick={onCancel}
            >
              Annulla
            </button>
            <button
              type='submit'
              className='save-btn'
            >
              <FaSave /> Salva
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default ActivityEditor;
