import { useState } from 'react'
import '../styles/quiz.css'

interface QuizQuestion {
	question: string
	options: string[]
	correctAnswer: number
	explanation?: string
	points: number
}

interface QuizData {
	title: string
	description: string
	difficulty: 'easy' | 'challenging' | 'advanced'
	category: string
	questions: QuizQuestion[]
}

interface QuizPlayerProps {
	quiz: QuizData
}

interface SelectedAnswer {
	answerIndex: number
	isCorrect: boolean
	points: number
}

export default function QuizPlayer({ quiz }: QuizPlayerProps) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [selectedAnswers, setSelectedAnswers] = useState<
		Record<number, SelectedAnswer>
	>({})
	const [showResults, setShowResults] = useState(false)
	const [showExplanation, setShowExplanation] = useState(false)

	const currentQuestion = quiz.questions[currentQuestionIndex]
	const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1
	const hasSelectedAnswer =
		selectedAnswers[currentQuestionIndex] !== undefined

	const handleAnswerSelect = (answerIndex: number) => {
		const isCorrect = answerIndex === currentQuestion.correctAnswer
		const points = isCorrect ? currentQuestion.points : 0

		setSelectedAnswers((prev) => ({
			...prev,
			[currentQuestionIndex]: {
				answerIndex,
				isCorrect,
				points,
			},
		}))

		if (currentQuestion.explanation) {
			setShowExplanation(true)
		}
	}

	const handleNext = () => {
		if (isLastQuestion) {
			setShowResults(true)
		} else {
			setCurrentQuestionIndex((prev) => prev + 1)
			setShowExplanation(false)
		}
	}

	const calculateResults = () => {
		const totalScore = Object.values(selectedAnswers).reduce(
			(sum, answer) => sum + answer.points,
			0
		)
		const correctAnswers = Object.values(selectedAnswers).filter(
			(answer) => answer.isCorrect
		).length
		const totalQuestions = quiz.questions.length
		const percentage = Math.round((correctAnswers / totalQuestions) * 100)

		return {
			totalScore,
			correctAnswers,
			totalQuestions,
			percentage,
		}
	}

	if (showResults) {
		const results = calculateResults()

		return (
			<div className='quiz-container'>
				<h2 className='question-text'>Quiz Complete! 🎉</h2>
				<div className='results-summary'>
					<p>
						<strong>Correct Answers:</strong>{' '}
						{results.correctAnswers} out of {results.totalQuestions}
					</p>
				</div>

				{/* <div className='results-breakdown'>
					<h3>Review Your Answers:</h3>
					{quiz.questions.map((question, index) => {
						const userAnswer = selectedAnswers[index]
						return (
							<div key={index} className='question-review'>
								<h4>
									Q{index + 1}: {question.question}
								</h4>
								<p
									className={
										userAnswer.isCorrect
											? 'correct'
											: 'incorrect'
									}
								>
									Your answer:{' '}
									{question.options[userAnswer.answerIndex]}
									{userAnswer.isCorrect ? ' ✓' : ' ✗'}
								</p>
								{!userAnswer.isCorrect && (
									<p className='correct-answer'>
										Correct answer:{' '}
										{
											question.options[
												question.correctAnswer
											]
										}
									</p>
								)}
								{question.explanation && (
									<p className='explanation'>
										{question.explanation}
									</p>
								)}
							</div>
						)
					})}
				</div> */}

				<button
					onClick={() => window.location.reload()}
					className='quiz-button'
				>
					Retake Quiz
				</button>
			</div>
		)
	}

	return (
		<div className='quiz-container'>
			<div className='quiz-header'>
				<div className='progress-bar'>
					<div className='progress-visual'>
						<div
							className='progress-fill'
							style={{
								width: `${
									((currentQuestionIndex + 1) /
										quiz.questions.length) *
									100
								}%`,
							}}
						/>
					</div>
					<div className='progress-text'>
						{currentQuestionIndex + 1} / {quiz.questions.length}
					</div>
				</div>
			</div>

			<div>
				<h2 className='question-text'>{currentQuestion.question}</h2>

				<div className='options-container'>
					{currentQuestion.options.map((option, index) => {
						const isSelected =
							selectedAnswers[currentQuestionIndex]
								?.answerIndex === index
						const isCorrect =
							index === currentQuestion.correctAnswer
						const showFeedback =
							hasSelectedAnswer && showExplanation

						let buttonClass = 'option-button'
						if (isSelected) {
							buttonClass += ' selected'
							if (showFeedback) {
								buttonClass += isCorrect
									? ' correct'
									: ' incorrect'
							}
						} else if (showFeedback && isCorrect) {
							buttonClass += ' correct-answer'
						}

						return (
							<button
								key={index}
								className={buttonClass}
								onClick={() => handleAnswerSelect(index)}
								disabled={hasSelectedAnswer}
							>
								{option}
								{showFeedback &&
									isSelected &&
									(isCorrect ? ' ✓' : ' ✗')}
								{showFeedback &&
									!isSelected &&
									isCorrect &&
									' ← Correct'}
							</button>
						)
					})}
				</div>

				{showExplanation && currentQuestion.explanation && (
					<div className='explanation-box'>
						<h4>Explanation:</h4>
						<p>{currentQuestion.explanation}</p>
					</div>
				)}

				{hasSelectedAnswer && (
					<div className='navigation'>
						<button onClick={handleNext} className='quiz-button'>
							{isLastQuestion ? 'Quiz Results' : 'Next Question'}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
