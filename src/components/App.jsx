import React, { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const updateCount = type => {
    setFeedback(prevState => ({ ...prevState, [type]: prevState[type] + 1 }));
  };

  const countTotalFeedback = () =>
    Object.values(feedback).reduce((acc, value) => acc + value, 0);

  const countPositiveFeedbackPercentage = () =>
    countTotalFeedback()
      ? ((feedback.good / countTotalFeedback()) * 100).toFixed(0)
      : '0';

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={feedback}
          onLeaveFeedback={updateCount}
        />
      </Section>

      {countTotalFeedback() ? (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
};
