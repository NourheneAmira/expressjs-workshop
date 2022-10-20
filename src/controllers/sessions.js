import Session from '../models/Session';

const getAllSessions = async (_req, res) => {
	const sessions = await Session.find();
	return res.send(sessions);
};

const getSessionById = async (req, res) => {
	const session = await Session.findById(req.params.id);
	return res.send(session);
};

const addSession = async (req, res) => {
	let session = await Session.create({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		status: req.body.status,
	});
	return res.send(session);
};

const updateSession = async (req, res) => {
	const session = await Session.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			start: req.body.start,
			end: req.body.end,
			status: req.body.status,
		},
		{
			new: true,
		}
	);

	return res.json({
		success: true,
		data: session,
		message: 'Update successful!',
	});
};

const deleteSession = async (req, res) => {
	const deletedSession = await Session.findByIdAndRemove(req.params.id);

	// finally response send with deleted data
	return res.json({
		success: true,
		data: deletedSession,
		message: 'Delete successful!',
	});
};

export {
	getAllSessions,
	getSessionById,
	addSession,
	updateSession,
	deleteSession,
};
