package main

import (
	"testing"

	"github.com/flosch/pongo2/v6"
)

func TestCanonicalizeURLFilter(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "clean URL",
			input:    "https://naschatai.com/profile/user",
			expected: "https://naschatai.com/profile/user",
		},
		{
			name:     "URL with query params",
			input:    "https://naschatai.com/profile/user?utm_source=test",
			expected: "https://naschatai.com/profile/user",
		},
		{
			name:     "URL with multiple params",
			input:    "https://naschatai.com/profile/user?utm_source=twitter&utm_campaign=test",
			expected: "https://naschatai.com/profile/user",
		},
		{
			name:     "URL with fragment",
			input:    "https://naschatai.com/profile/user#section",
			expected: "https://naschatai.com/profile/user",
		},
		{
			name:     "URL with both params and fragment",
			input:    "https://naschatai.com/profile/user?param=1#section",
			expected: "https://naschatai.com/profile/user",
		},
		{
			name:     "malformed URL",
			input:    "not-a-url",
			expected: "not-a-url", // Should return original on error
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			inputValue := pongo2.AsValue(tt.input)
			result, err := filterCanonicalizeURL(inputValue, nil)
			if err != nil {
				t.Errorf("filterCanonicalizeURL() error = %v", err)
				return
			}

			if result.String() != tt.expected {
				t.Errorf("filterCanonicalizeURL() = %v, want %v", result.String(), tt.expected)
			}
		})
	}
}
