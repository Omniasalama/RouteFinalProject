import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse">
      <!-- Card Skeleton -->
      @if (type === 'card') {
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
            <div class="text-right">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
              <div class="flex space-x-2">
                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
              </div>
            </div>
          </div>
          
          <div class="space-y-3 mb-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            @for (item of [1, 2, 3]; track item) {
              <div class="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                </div>
              </div>
            }
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
            <div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 mb-2"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            </div>
          </div>
          
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <div class="flex justify-between">
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            </div>
            <div class="flex justify-between">
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
            </div>
            <div class="flex justify-between">
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        </div>
      }

      <!-- Product Card Skeleton -->
      @if (type === 'product-card') {
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-700">
            <div class="h-48 w-full bg-gray-200 dark:bg-gray-600"></div>
          </div>
          <div class="p-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div class="flex items-center justify-between">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          </div>
        </div>
      }

      <!-- List Item Skeleton -->
      @if (type === 'list-item') {
        <div class="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
      }

      <!-- Table Row Skeleton -->
      @if (type === 'table-row') {
        <tr class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <td class="px-6 py-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </td>
          <td class="px-6 py-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </td>
          <td class="px-6 py-4">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </td>
          <td class="px-6 py-4">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
          </td>
        </tr>
      }

      <!-- Custom Skeleton -->
      @if (type === 'custom') {
        <div class="space-y-4">
          @for (line of lines; track $index) {
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" [style.width.%]="line"></div>
          }
        </div>
      }
    </div>
  `,
  styles: []
})
export class SkeletonComponent {
  @Input() type: 'card' | 'product-card' | 'list-item' | 'table-row' | 'custom' = 'card';
  @Input() lines: number[] = [100, 80, 60, 40];
  @Input() count: number = 1;
}
