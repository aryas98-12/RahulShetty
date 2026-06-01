import * as fs from 'fs';
import { siteConfigs } from './testUsers';

function getCappedWorkerIndex(workerIndex: number, siteName: string): number {
  const siteConfig = siteConfigs.find(s => s.name === siteName);
  if (!siteConfig) throw new Error(`❌ Site config not found for: ${siteName}`);
  return workerIndex % siteConfig.workers;  // ← cap to available users
}

export function getTokenFromStorage(workerIndex: number, siteName: string): string {
  const cappedIndex = getCappedWorkerIndex(workerIndex, siteName);  // ← use capped
  const storageState = JSON.parse(
    fs.readFileSync(`storage/${siteName}/user-${cappedIndex}.json`, 'utf-8')
  );

  const origin = storageState.origins?.find((o: any) =>
    o.origin.includes('rahulshettyacademy.com')
  );

  const token = origin?.localStorage?.find((e: any) =>
    e.name === 'token'
  )?.value;

  if (!token) throw new Error(`❌ Token not found for worker ${workerIndex}`);

  return token;
}

export function getUserIdFromStorage(workerIndex: number, siteName: string): string {
  const storageState = JSON.parse(
    fs.readFileSync(`storage/${siteName}/user-${workerIndex}.json`, 'utf-8')
  );

  const origin = storageState.origins?.find((o: any) =>
    o.origin.includes('rahulshettyacademy.com')
  );

  const userId = origin?.localStorage?.find((e: any) =>
    e.name === 'userId'  // ← matches what we saved
  )?.value;

  if (!userId) throw new Error(`❌ UserId not found for worker ${workerIndex}`);
  return userId;
}