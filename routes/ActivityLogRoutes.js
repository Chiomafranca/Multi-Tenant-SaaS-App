const express = require('express');
const {
  createActivityLog,
  getActivityLogById,
  updateActivityLog,
  deleteActivityLog,
  getAllActivityLogs
} = require('../controllers/ActivityLogController');

const router = express.Router();
const { activityLogger } = require('../middlewares/ActivityLog');

router.post('/', createActivityLog, activityLogger);


router.get('/:id', getActivityLogById);

router.get('/', getAllActivityLogs)


router.put('/:id', updateActivityLog, activityLogger);


router.delete('/:id', deleteActivityLog, activityLogger);

module.exports = router;
