#pragma once

#include "util/none.h"

#if defined(PBL_SDK_3)
#define IF_SDK_3_ELSE(sdk3, other) sdk3
#define IF_SDK_2_ELSE(sdk2, other) other
#define SDK_3_USAGE
#define SDK_2_USAGE __attribute__((unused))
#elif defined(PBL_SDK_2)
#define IF_SDK_3_ELSE(sdk3, other) other
#define IF_SDK_2_ELSE(sdk2, other) sdk2
#define SDK_3_USAGE __attribute__((unused))
#define SDK_2_USAGE
#endif

#ifdef PBL_SDK_3
#define SDK_SELECT(sdk3, sdk2) sdk3
#elif PBL_SDK_2
#define SDK_SELECT(sdk3, sdk2) sdk2
#endif
