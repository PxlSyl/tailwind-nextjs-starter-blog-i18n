// pages/api/blocks.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    {
      id: '1',
      title_uk: 'Блок 1',
      title_en: 'Block 1',
      text_uk: 'Текст блоку 1 українською',
      text_en: 'Block 1 text in English'
    },
    {
      id: '2',
      title_uk: 'Блок 2',
      title_en: 'Block 2',
      text_uk: 'Текст блоку 2 українською',
      text_en: 'Block 2 text in English'
    },
    {
      id: '3',
      title_uk: 'Блок 3',
      title_en: 'Block 3',
      text_uk: 'Текст блоку 3 українською',
      text_en: 'Block 3 text in English'
    },
    {
      id: '4',
      title_uk: 'Блок 4',
      title_en: 'Block 4',
      text_uk: 'Текст блоку 4 українською',
      text_en: 'Block 4 text in English'
    },
    {
      id: '5',
      title_uk: 'Блок 5',
      title_en: 'Block 5',
      text_uk: 'Текст блоку 5 українською',
      text_en: 'Block 5 text in English'
    }
  ]);
}
