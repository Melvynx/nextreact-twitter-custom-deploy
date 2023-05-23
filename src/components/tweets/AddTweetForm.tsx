'use client';

import clsx from 'clsx';
import type { Session } from 'next-auth';
import type { FormEvent } from 'react';
import { useState } from 'react';
import GrowingTextArea from '../form/GrowingTextArea';
import { TweetBase } from './Tweet';

type AddTweetFormProps = {
  onSubmit?: (content: string) => void;
  disabled?: boolean;
  user: Session['user'];
};

export const AddTweetForm = ({ onSubmit, disabled, user }: AddTweetFormProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit?.(value);

    setValue('');
  };

  return (
    <TweetBase
      className="border-b-2 border-neutral-700"
      user={{
        id: user.id ?? '',
        username: user.name ?? '',
        displayName: user.name ?? '',
        image: user.image ?? '',
      }}
    >
      <form onSubmit={handleSubmit} className="flex w-full flex-col items-end">
        <GrowingTextArea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="What's happening?"
        ></GrowingTextArea>
        <button
          type="submit"
          className={clsx('mt-4 rounded-full bg-blue-500 px-4 py-2 text-white', {
            'cursor-not-allowed opacity-50': disabled,
          })}
        >
          Tweet
        </button>
      </form>
    </TweetBase>
  );
};
