import { X } from 'lucide-react';
import { useState } from 'react';

interface AssignDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function AssignDeviceModal({ isOpen, onClose, userId }: AssignDeviceModalProps) {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  
  const availableDevices = [
    'DEV-001',
    'DEV-002',
    'DEV-003',
    'DEV-004',
    'DEV-005',
  ];

  if (!isOpen) return null;

  const handleToggleDevice = (deviceId: string) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Assigned ${selectedDevices.length} device(s) to ${userId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-heading">Assign Devices</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              User ID
            </label>
            <input
              type="text"
              value={userId}
              disabled
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Select Devices
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableDevices.map((deviceId) => (
                <label
                  key={deviceId}
                  className="flex items-center gap-3 p-3 bg-slate-700 rounded-md hover:bg-slate-600 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(deviceId)}
                    onChange={() => handleToggleDevice(deviceId)}
                    className="w-4 h-4 text-blue-500 bg-slate-600 border-slate-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-white">{deviceId}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Assign Devices
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
